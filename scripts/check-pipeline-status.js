#!/usr/bin/env node

/**
 * Pipeline Status Checker
 * Checks the status of all CI/CD pipelines for SweetSpot Marketplace
 */

import https from 'https';
import { execSync } from 'child_process';

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

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });
    
    req.on('error', reject);
    req.end();
  });
}

async function checkGitHubActionsStatus(repo) {
  try {
    log('\n🔍 Checking GitHub Actions Status...', 'blue');
    
    // Check if GitHub Actions are enabled
    const workflowsUrl = `https://api.github.com/repos/${repo}/actions/workflows`;
    const workflows = await makeRequest(workflowsUrl);
    
    if (workflows.workflows) {
      log(`✅ Found ${workflows.workflows.length} GitHub Actions workflows:`, 'green');
      workflows.workflows.forEach(workflow => {
        log(`   - ${workflow.name} (${workflow.state})`, workflow.state === 'active' ? 'green' : 'yellow');
      });
    }
    
    // Check recent runs
    const runsUrl = `https://api.github.com/repos/${repo}/actions/runs?per_page=5`;
    const runs = await makeRequest(runsUrl);
    
    if (runs.workflow_runs) {
      log('\n📊 Recent GitHub Actions Runs:', 'blue');
      runs.workflow_runs.forEach(run => {
        const status = run.conclusion || run.status;
        const statusColor = status === 'success' ? 'green' : status === 'failure' ? 'red' : 'yellow';
        log(`   - ${run.name}: ${status} (${run.created_at})`, statusColor);
      });
    }
    
    return true;
  } catch (error) {
    log(`❌ Error checking GitHub Actions: ${error.message}`, 'red');
    return false;
  }
}

async function checkCircleCIStatus() {
  try {
    log('\n🔍 Checking CircleCI Status...', 'blue');
    
    // Check if CircleCI config exists
    const fs = await import('fs');
    if (fs.existsSync('.circleci/config.yml')) {
      log('✅ CircleCI configuration found', 'green');
      
      // Check for recent builds (this would require CircleCI API token)
      log('ℹ️  CircleCI builds status would be available with API token', 'yellow');
      log('   To check CircleCI builds: https://app.circleci.com/pipelines/github/justishika/DevSecOps-SweetSpot', 'blue');
    } else {
      log('❌ CircleCI configuration not found', 'red');
      return false;
    }
    
    return true;
  } catch (error) {
    log(`❌ Error checking CircleCI: ${error.message}`, 'red');
    return false;
  }
}

function checkLocalPipelineFiles() {
  log('\n🔍 Checking Local Pipeline Files...', 'blue');
  
  const fs = require('fs');
  const path = require('path');
  
  const pipelineFiles = [
    '.github/workflows/ci-cd.yml',
    '.github/workflows/circleci-trigger.yml',
    '.circleci/config.yml',
    'Dockerfile',
    'docker-compose.yml',
    'docker/development/docker-compose.yml',
    'docker/production/docker-compose.prod.yml'
  ];
  
  pipelineFiles.forEach(file => {
    if (fs.existsSync(file)) {
      log(`✅ ${file}`, 'green');
    } else {
      log(`❌ ${file} - MISSING`, 'red');
    }
  });
}

function checkGitConfiguration() {
  log('\n🔍 Checking Git Configuration...', 'blue');
  
  try {
    const remoteUrl = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim();
    log(`✅ Git remote: ${remoteUrl}`, 'green');
    
    const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    log(`✅ Current branch: ${currentBranch}`, 'green');
    
    const lastCommit = execSync('git log -1 --oneline', { encoding: 'utf8' }).trim();
    log(`✅ Last commit: ${lastCommit}`, 'green');
    
    return true;
  } catch (error) {
    log(`❌ Error checking git configuration: ${error.message}`, 'red');
    return false;
  }
}

async function main() {
  log('🚀 SweetSpot Marketplace Pipeline Status Checker', 'bold');
  log('=' .repeat(50), 'blue');
  
  // Check local files
  checkLocalPipelineFiles();
  
  // Check git configuration
  const gitOk = checkGitConfiguration();
  
  if (gitOk) {
    // Check GitHub Actions
    await checkGitHubActionsStatus('justishika/DevSecOps-SweetSpot');
    
    // Check CircleCI
    await checkCircleCIStatus();
  }
  
  log('\n📋 Pipeline Summary:', 'bold');
  log('1. GitHub Actions: Configured for main/develop branches', 'blue');
  log('2. CircleCI: Configured for main/develop branches', 'blue');
  log('3. Docker: Multi-stage builds for dev/prod', 'blue');
  log('4. Triggers: Push to main/develop branches', 'blue');
  
  log('\n🎯 Next Steps:', 'bold');
  log('1. Push changes to GitHub to trigger pipelines', 'green');
  log('2. Monitor pipeline execution in GitHub Actions tab', 'green');
  log('3. Check CircleCI dashboard for builds', 'green');
  log('4. Verify all tests and builds pass', 'green');
  
  log('\n✅ Pipeline check completed!', 'green');
}

main().catch(console.error);
