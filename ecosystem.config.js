module.exports = {
  apps: [{
    name: 'loveBlog',
    script: 'app.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'dc2-user',
      host: '117.51.157.5',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      ssh_options: 'StrictHostKeyChecking=no',
      path: '~/www/loveBlog/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'env': {
        NODE_ENV: 'production'
      }
    }
  }
};
