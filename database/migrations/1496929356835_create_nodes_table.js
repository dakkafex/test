'use strict'

const Schema = use('Schema')

class NodesTableSchema extends Schema {

  up() {
    this.create('nodes', (table) => {
      table.increments().notNullable().unique()
      table.string('group')
      table.string('title')
      table.timestamps()
    })
  }

  down() {
    this.drop('nodes')
  }

}

module.exports = NodesTableSchema
