async function getData() {
    const apiResponse = await (await fetch('api/data/botstats')).json()

    const servers = apiResponse.guilds
    const users = apiResponse.members
    const commands = apiResponse.commands

    const statsServers = document.getElementById('stats-servers')
    const statsUsers = document.getElementById('stats-users')
    const statsCommands = document.getElementById('stats-commands')

    statsServers.textContent = `${servers} Servers`
    statsUsers.textContent = `${users} Users`
    statsCommands.textContent = `${commands} Commands`
}

getData()