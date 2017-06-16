'use strict'
const LinkAi = use('App/Model/Link')
const NodeAi = use('App/Model/Node')
const User = use('App/Model/User')
const Database = use('Database')
const Validator = use('Validator')

class AiController {
    /**Cms authentication */
    * login(request, response) {
        const postData = request.only('uid', 'password')
        try {
            yield request.auth.attempt(postData.uid, postData.password)
            response.redirect('/')
        } catch (e) {
            yield request.with({ error: e.message }).flash()
            response.redirect('back')
            return
        }
    }

    * logout(request, response) {
        yield request.auth.logout()

        yield request.with({ message: 'logged out' }).flash()
        response.redirect('/login')
    }

    /**API controller functions */
    * apiIndex(request, response) {
        const links = yield LinkAi.all()
        const nodes = yield NodeAi.all()


        const data = {
            nodes: nodes,
            links: links
        }

        response.json(data, { data: data })
    }

    /**CRUD functions for nodes */
    * nodeIndex(request, response) {
        const nodes = yield NodeAi.all()

        yield response.sendView('nodes', { nodes: nodes.toJSON() })
    }

    * nodeNew(request, response) {
        const postData = request.only('group', 'title')

        const rules = {
            title: 'required',
            group: 'required'
        }
        const validation = yield Validator.validate(postData, rules)
        if (validation.fails()) {
            yield request
                .withOnly('title', 'group')
                .andWith({ errors: validation.messages() })
                .flash()

            response.redirect('back')
            return
        }

        yield NodeAi.create(postData)
        response.redirect('back')
    }

    * nodeUpdate(request, response) {

    }

    * nodeDestroy(request, response) {
        const postData = request.only('id')
        const node = yield NodeAi.findBy(postData)
        yield node.delete()

        response.redirect('back')
    }

    /**CRUD functions for links */
    * linkIndex(request, response) {
        const isLoggedIn = yield request.auth.check()
        console.log(isLoggedIn);

        const nodes = yield NodeAi.all()
        const links = yield Database
            .select('source.title AS source ', 'target.title AS target', 'links.id', 'links.type')
            .from('links')
            .innerJoin('nodes as source', 'links.source', 'source.id')
            .innerJoin('nodes as target', 'links.target', 'target.id')

        yield response.sendView('links', { links: links, nodes: nodes.toJSON() })
    }

    * linkNew(request, response) {
        const postData = request.only('source', 'target', 'type')

                const rules = {
            source: 'required',
            target: 'required',
            type: 'required'
        }
        const validation = yield Validator.validate(postData, rules)
        if (validation.fails()) {
            yield request
                .withOnly('source', 'target', 'type')
                .andWith({ errors: validation.messages() })
                .flash()

            response.redirect('back')
            return
        }

        yield LinkAi.create(postData)
        response.redirect('back')
    }

    * linkUpdate(request, response) {

    }

    * linkDestroy(request, response) {
        const postData = request.only('id')
        const link = yield LinkAi.findBy(postData)
        yield link.delete()

        response.redirect('back')
    }
}

module.exports = AiController
