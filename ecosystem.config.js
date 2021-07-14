module.exports = {
    apps: [
        {
            name: 'fenglou',
            exec_mode: 'cluster',
            instances: 'max', // Or a number of instances
            script: 'yarn',
            args: 'start'
        }
    ]
}