<template>
    <component :is="type" :tag="tag" :name="name"
               v-bind="$attrs" v-on="hooks">
        <slot></slot>
    </component>
</template>

<script>
export default {
    props:
        {
            duration: {
                default: 300
            },
            delay: {
                default: 0
            },
            group: {
                type: Boolean,
                default: false
            },
            tag: {
                type: String,
                default: "div"
            },
            name: {
                type: String,
                default: "fade"
            },
            changeHeight: {
                type: Boolean,
                default: false
            }
        },
    computed: {
        type() {
            return this.group ? "transition-group" : "transition";
        },
        hooks() {
            return {
                beforeEnter: this.beforeEnter,
                enter: this.enter,
                afterEnter: this.afterEnter,
                leave: this.leave,
                beforeLeave: this.beforeLeave,
                afterLeave: this.cleanUpDuration,
                ...this.$listeners
            }
        }
    },
    methods: {
        beforeEnter(el) {
            this.setDuration(el, this.duration, this.delay, 'enter')
        },
        enter(el) {
            if (this.changeHeight) {
                el.style.height = 'auto';
                const height = getComputedStyle(el).height;
                el.style.height = 0;
                getComputedStyle(el).height;

                requestAnimationFrame(() => {
                    el.style.height = height;
                });
            }
        },
        afterEnter(el) {
            if (this.changeHeight) {
                el.style.height = 'auto';
            }
            this.cleanUpDuration(el)
        },
        beforeLeave(el) {
            this.setDuration(el, this.duration, this.delay, 'leave')
        },
        leave(el) {
            if (this.changeHeight && (this.duration > 0 || this.duration.leave > 0)) {
                const height = getComputedStyle(el).height;
                el.style.height = height;
                getComputedStyle(el).height;

                requestAnimationFrame(() => {
                    el.style.height = 0;
                });
            }
        },
        setDuration(el, duration, delay, name) {
            (typeof duration == 'object') ? el.style.transition = `${duration[name]}ms cubic-bezier(.51, .11, .46, .75)` : el.style.transition = `${duration}ms cubic-bezier(.51, .11, .46, .75)`;
            (typeof delay == 'object') ? el.style.transitionDelay = `${delay[name]}ms` : el.style.transitionDelay = `${delay}ms`;
        },
        cleanUpDuration(el) {
            el.style.transition = ''
            el.style.transitionDelay = ''
        },
    }
};
</script>