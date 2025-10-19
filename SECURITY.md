# 🔒 Security Guidelines for SweetSpot Marketplace

## ⚠️ CRITICAL: Credential Security

### **NEVER commit real credentials to the repository!**

#### **What to NEVER commit:**
- ❌ Real MongoDB Atlas connection strings with passwords
- ❌ JWT secrets used in production
- ❌ API keys or tokens
- ❌ Database passwords
- ❌ Any sensitive environment variables

#### **What to ALWAYS use:**
- ✅ Placeholder values in example files
- ✅ Environment variables for sensitive data
- ✅ `.env` files (which are gitignored)
- ✅ Secret management tools like Doppler

---

## 🔐 Security Best Practices

### **Environment Variables**
```bash
# ✅ GOOD: Use placeholder values in example files
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# ❌ BAD: Never use real credentials in committed files
MONGODB_URI=mongodb+srv://real-user:real-pass@real-cluster.mongodb.net/database
```

### **File Management**
- ✅ **Always use `.env` files** for local development
- ✅ **Keep `.env` in `.gitignore`** (already configured)
- ✅ **Use `docker.env.example`** as a template
- ❌ **Never commit `.env` files** with real credentials

### **MongoDB Atlas Security**
1. **Change default passwords** immediately after setup
2. **Use strong, unique passwords**
3. **Enable IP whitelisting** for production
4. **Use database users** with minimal required permissions
5. **Regularly rotate credentials**

### **JWT Security**
- ✅ **Use strong, random secrets** (32+ characters)
- ✅ **Rotate secrets regularly**
- ✅ **Use different secrets** for different environments
- ❌ **Never use weak or default secrets**

---

## 🛡️ Current Security Measures

### **Implemented Security Features:**
- ✅ **JWT Authentication** with bcrypt password hashing
- ✅ **CORS Configuration** for cross-origin security
- ✅ **Environment Variable Protection** with .gitignore
- ✅ **Docker Security** with non-root users
- ✅ **Secret Management** with Doppler integration
- ✅ **Security Scanning** in CI/CD pipelines

### **CI/CD Security:**
- ✅ **Automated security audits** with npm audit
- ✅ **Dependency vulnerability scanning**
- ✅ **Code quality checks** with ESLint
- ✅ **Container security** with minimal base images

---

## 🚨 If Credentials Are Exposed

### **Immediate Actions:**
1. **Change passwords immediately** in MongoDB Atlas
2. **Regenerate JWT secrets**
3. **Remove credentials from git history** if needed
4. **Update all environment variables**
5. **Notify team members** if working in a team

### **MongoDB Atlas:**
1. Go to MongoDB Atlas dashboard
2. Navigate to Database Access
3. Change password for affected user
4. Update connection strings in all environments

### **Git History Cleanup (if needed):**
```bash
# Remove sensitive file from git history
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch .env' \
  --prune-empty --tag-name-filter cat -- --all

# Force push to update remote repository
git push origin --force --all
```

---

## 📋 Security Checklist

### **Before Committing:**
- [ ] No real credentials in any files
- [ ] All `.env` files are gitignored
- [ ] Example files use placeholder values
- [ ] No API keys or tokens exposed
- [ ] Passwords are strong and unique

### **Before Deployment:**
- [ ] All environment variables set securely
- [ ] MongoDB Atlas access properly configured
- [ ] JWT secrets are strong and unique
- [ ] CORS settings are appropriate
- [ ] Security scanning passes

### **Regular Maintenance:**
- [ ] Rotate credentials periodically
- [ ] Review access permissions
- [ ] Update dependencies regularly
- [ ] Monitor security alerts
- [ ] Review audit logs

---

## 🔗 Security Resources

- [MongoDB Atlas Security Best Practices](https://docs.atlas.mongodb.com/security/)
- [JWT Security Best Practices](https://tools.ietf.org/html/rfc7519)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)
- [GitHub Security Best Practices](https://docs.github.com/en/github/managing-security-vulnerabilities)

---

**Remember: Security is everyone's responsibility! 🛡️**
