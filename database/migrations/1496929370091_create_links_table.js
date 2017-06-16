'use strict'

const Schema = use('Schema')

class LinksTableSchema extends Schema {

  up() {
    this.create('links', (table) => {
      table.increments().notNullable().unique()
      table.integer('source')
      table.integer('target')
      table.string('type')
      table.timestamps()
    })
  }

  down() {
    this.drop('links')
  }

}

module.exports = LinksTableSchema
