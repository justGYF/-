class HistoryRouter {
    constructor() {
        this.current = null
    }
}


class MyRouter {
    constructor(options = {}) {
        this.mode = options.mode || 'hash'
        this.routerList = options.routes || []
        this.routerMap = this.createMap(this.routerList)
        
        this.history = new HistoryRouter()
        this.init()
    }

    init () {
        if (this.mode === 'hash') {
            location.hash ? '' : location.hash = '/'
            window.addEventListener('load', () => {
                this.history.current = location.hash.slice(1)
            })
            window.addEventListener('hashchange', () => {
                this.history.current = location.hash.slice(1)
            })
        } else {
            location.pathname ? '' : location.pathname = '/'
            window.addEventListener('load', () => {
                this.history.current = location.pathname
            })
            window.addEventListener('popstate', () => {
                this.history.current = location.pathname
            })
        }
    }


    createMap (arr) {
        return arr.reduce((pre, current) => {
            pre[current.path] = current.component
            return pre
        }, {})
    }
}

MyRouter.install = function(Vue) {
    
    Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.router) {
                this._root = this
                this._router = this.$options.router
                Vue.util.defineReactive(this, "", this._router.history)
            } else {
                this._root = this.$parent && this.$parent._root
            }
            Object.defineProperty(this, '$router', {
                get () {
                    return this._root._router
                }
            })

            Object.defineProperty(this, '$routes', {
                get () {
                    return this._root._router.history.current
                }
            })
        }
    })



    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                default: ''
            }
        },
        render (h) {
            let mode = this._self._root._router.mode
            let to = mode === 'hash' ? `#${this.to}` : this.to

            return h('a', {
                attrs: {href: to},
                on: {
                    click: (e) => {
                        if (mode !== 'hash') {
                            e.preventDefault()
                            history.pushState(null, '', to)
                        }
                    }
                } 
            }, this.$slots.default)
        }
    })

    Vue.component('router-view', {
        render (h) {
            let current = this._self._root._router.history.current
            let routeMap = this._self._root._router.routerMap;
            return h(routeMap[current])
        }
    })
}

export default MyRouter
