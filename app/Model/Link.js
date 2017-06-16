'use strict'

const Lucid = use('Lucid')

class Link extends Lucid {
    static get visible() {
        return [ 'source', 'target', 'type']
    }
}

module.exports = Link
