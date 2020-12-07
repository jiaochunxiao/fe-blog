function getIPAddress() {
  const os = require('os');
  console.log(os);
  const interfaces = require('os').networkInterfaces();
  console.log(interfaces);
  for (const devName in interfaces) {
      const iface = interfaces[devName];
      for (let i = 0; i < iface.length; i++) {
          const alias = iface[i];
          if (alias.family.toLocaleLowerCase() === 'ipv4' && alias.address !== '127.0.0.1' && !alias.internal) {
              return alias.address;
          }
      }
  }
}
getIPAddress();