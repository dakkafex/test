'use strict'

const Lucid = use('Lucid')

class Node extends Lucid {
    static get visible() {
        return ['id', 'group', 'title']
    }

}

module.exports = Node
