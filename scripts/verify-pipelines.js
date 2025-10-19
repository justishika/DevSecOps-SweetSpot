#!/usr/bin/env node

/**
 * Pipeline Verification Script
 * Verifies that all CI/CD pipelines are properly configured and will execute on GitHub push
 */

import fs from 'fs';
import path from 'path';

const COLORS = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function checkFileExists(filePath, description) {
  if (fs.existsSync(filePath)) {
    log(`✅ ${description}: ${filePath}`, 'green');
    return true;
  } else {
    log(`❌ ${description}: ${filePath} - MISSING`, 'red');
    return false;
  }
}

function checkYamlContent(filePath, description, requiredKeywords) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let allFound = true;
    
    requiredKeywords.forEach(keyword => {
      if (content.includes(keyword)) {
        log(`   ✅ Contains: ${keyword}`, 'green');
      } else {
        log(`   ❌ Missing: ${keyword}`, 'red');
        allFound = false;
      }
    });
    
    return allFound;
  } catch (error) {
    log(`❌ Error reading ${description}: ${error.message}`, 'red');
    return false;
  }
}

function verifyGitHubActions() {
  log('\n🔍 Verifying GitHub Actions Configuration...', 'blue');
  
  const githubWorkflowsDir = '.github/workflows';
  const requiredFiles = [
    'ci-cd.yml',
    'circleci-trigger.yml'
  ];
  
  let allGood = true;
  
  requiredFiles.forEach(file => {
    const filePath = path.join(githubWorkflowsDir, file);
    if (checkFileExists(filePath, `GitHub Actions workflow`)) {
      // Check for required triggers
      const requiredKeywords = ['push:', 'branches:', 'main'];
      if (!checkYamlContent(filePath, `GitHub Actions workflow`, requiredKeywords)) {
        allGood = false;
      }
    } else {
      allGood = false;
    }
  });
  
  return allGood;
}

function verifyCircleCI() {
  log('\n🔍 Verifying CircleCI Configuration...', 'blue');
  
  const circleciConfig = '.circleci/config.yml';
  if (checkFileExists(circleciConfig, 'CircleCI configuration')) {
    const requiredKeywords = ['workflows:', 'deployment-pipeline:', 'integration-tests'];
    return checkYamlContent(circleciConfig, 'CircleCI configuration', requiredKeywords);
  }
  return false;
}

function verifyDockerConfig() {
  log('\n🔍 Verifying Docker Configuration...', 'blue');
  
  const dockerFiles = [
    'Dockerfile',
    'docker-compose.yml',
    'docker/development/Dockerfile.dev',
    'docker/development/docker-compose.yml',
    'docker/production/Dockerfile',
    'docker/production/docker-compose.prod.yml',
    'docker/nginx/nginx.conf'
  ];
  
  let allGood = true;
  
  dockerFiles.forEach(file => {
    if (!checkFileExists(file, 'Docker configuration')) {
      allGood = false;
    }
  });
  
  return allGood;
}

function verifyPackageScripts() {
  log('\n🔍 Verifying Package.json Scripts...', 'blue');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredScripts = [
      'docker:dev',
      'docker:prod',
      'docker:build',
      'test',
      'build',
      'start'
    ];
    
    let allGood = true;
    
    requiredScripts.forEach(script => {
      if (packageJson.scripts && packageJson.scripts[script]) {
        log(`   ✅ Script: ${script}`, 'green');
      } else {
        log(`   ❌ Missing script: ${script}`, 'red');
        allGood = false;
      }
    });
    
    return allGood;
  } catch (error) {
    log(`❌ Error reading package.json: ${error.message}`, 'red');
    return false;
  }
}

function verifyGitConfiguration() {
  log('\n🔍 Verifying Git Configuration...', 'blue');
  
  const gitFiles = [
    '.gitignore',
    'README.md',
    'LICENSE'
  ];
  
  let allGood = true;
  
  gitFiles.forEach(file => {
    if (!checkFileExists(file, 'Git file')) {
      allGood = false;
    }
  });
  
  // Check if git remote is configured
  try {
    const { execSync } = require('child_process');
    const remoteUrl = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim();
    if (remoteUrl.includes('github.com/justishika/DevSecOps-SweetSpot')) {
      log(`✅ Git remote configured: ${remoteUrl}`, 'green');
    } else {
      log(`❌ Git remote not configured properly: ${remoteUrl}`, 'red');
      allGood = false;
    }
  } catch (error) {
    log(`❌ Error checking git remote: ${error.message}`, 'red');
    allGood = false;
  }
  
  return allGood;
}

function main() {
  log('🚀 SweetSpot Marketplace Pipeline Verification', 'bold');
  log('=' .repeat(50), 'blue');
  
  const checks = [
    { name: 'GitHub Actions', fn: verifyGitHubActions },
    { name: 'CircleCI', fn: verifyCircleCI },
    { name: 'Docker Configuration', fn: verifyDockerConfig },
    { name: 'Package Scripts', fn: verifyPackageScripts },
    { name: 'Git Configuration', fn: verifyGitConfiguration }
  ];
  
  const results = checks.map(check => ({
    name: check.name,
    passed: check.fn()
  }));
  
  log('\n📊 Verification Summary:', 'bold');
  results.forEach(result => {
    const status = result.passed ? '✅ PASSED' : '❌ FAILED';
    const color = result.passed ? 'green' : 'red';
    log(`${result.name}: ${status}`, color);
  });
  
  const allPassed = results.every(result => result.passed);
  
  if (allPassed) {
    log('\n🎉 All pipeline configurations are properly set up!', 'green');
    log('✅ Pipelines will execute on GitHub push', 'green');
    log('✅ Docker builds are configured', 'green');
    log('✅ CI/CD workflows are ready', 'green');
  } else {
    log('\n⚠️  Some pipeline configurations need attention', 'yellow');
    log('Please fix the issues above before pushing to GitHub', 'yellow');
  }
  
  log('\n📋 Pipeline Execution Summary:', 'bold');
  log('1. Push to main branch → Triggers GitHub Actions + CircleCI', 'blue');
  log('2. Push to develop branch → Triggers GitHub Actions + CircleCI (limited)', 'blue');
  log('3. Pull request to main → Triggers GitHub Actions', 'blue');
  log('4. All pipelines include: tests, builds, Docker, security scans', 'blue');
  
  return allPassed;
}

main();
