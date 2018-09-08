const Command = require('../base')
const renderShortDesc = require('../utils/renderShortDescription')

class UnlinkCommand extends Command {
  async run() {
    const { site, state } = this.netlify
    const siteId = site.get('siteId')

    if (!siteId) {
      this.log(`Folder is not linked to a Netlify site`)
      return this.exit()
    }

    let siteData
    try {
      siteData = await this.netlify.api.getSite({ siteId })
    } catch (e) {
      // ignore errors if we can't get the site
    }

    state.delete('siteId')

    this.log(`Unlinked ${site.configPath} from ${siteData ? siteData.name : siteId}`)
  }
}

UnlinkCommand.description = `${renderShortDesc('Unlink a local folder from a Netlify site')}`

module.exports = UnlinkCommand