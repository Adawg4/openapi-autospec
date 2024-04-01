const { exec } = require('child_process');
const { promisify } = require('util');

const os = require('os');

function getOperatingSystem() {
  const platform = os.platform();

  if (platform === 'darwin') {
    return 'macOS';
  } else if (platform === 'win32') {
    return 'Windows';
  } else if (platform === 'linux') {
    return 'Linux';
  } else {
    return 'unknown';
  }
}

const osName = getOperatingSystem();

const execAsync = promisify(exec);

async function configureProxy(ip, port) {
    try {
        // Run commands to set proxy settings
        if (osName === 'Windows') {
            await execAsync(`netsh winhttp set proxy ${ip}:${port}`);
        } else if (osName === 'macOS') {
            await execAsync(`networksetup -setwebproxy wi-fi ${ip} ${port}`);
        } else if (osName === 'Linux') {
            await execAsync(`gsettings set org.gnome.system.proxy mode 'manual'`);
            await execAsync(`gsettings set org.gnome.system.proxy.http host '${ip}'`);
            await execAsync(`gsettings set org.gnome.system.proxy.http port ${port}`);
            await execAsync(`gsettings set org.gnome.system.proxy.https host '${ip}'`);
            await execAsync(`gsettings set org.gnome.system.proxy.https port ${port}`);
        } else {
            throw new Error('Unsupported operating system');
        }
        console.log('Proxy settings configured.');
    } catch (error) {
        console.error('Error configuring proxy settings:', error);
    }
}

async function revertProxy() {
    try {
        // Run commands to revert proxy settings
        if (osName === 'Windows') {
            await execAsync('netsh winhttp reset proxy');
        } else if (osName === 'macOS') {
            await execAsync('networksetup -setwebproxystate wi-fi off');
        } else if (osName === 'Linux') {
            await execAsync(`gsettings set org.gnome.system.proxy mode 'none'`);
        } else {
            throw new Error('Unsupported operating system');
        }
        console.log('Proxy settings reverted.');
    } catch (error) {
        console.error('Error reverting proxy settings:', error);
    }
}

module.exports = {
    configureProxy,
    revertProxy
}
