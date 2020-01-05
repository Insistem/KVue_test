class KVue {
    constructor (options) {
        // 保存下传进来的值
        this.$options = options
        // 保存data
        this.$data = options.data
        this.observe(this.$data)
    }
    observe (data) {
        if (!data || typeof data !== 'object') {
            return
        }
        Object.keys(data).forEach(key =>{
            this.defineReactive(data, key, data[key])
            this.proxyData(this, key, data[key])
        })
    }
    defineReactive(obj, key, val) {
        Object.defineProperty(obj, key, {
            get() {
                return val
            },
            set(newVal) {
                val = newVal
            }
        })
    }
    // 代理
    proxyData(obj, key, val) {
        Object.defineProperty(obj, key, {
            get() {
                return this.$data[key]
            },
            set(newVal) {
                this.$data[key] = newVal
                this.observe(newVal)
                console.log(key + '属性更新了')
            }
        })
    }
}