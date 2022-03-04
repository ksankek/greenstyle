import {mapGetters} from "vuex";
import templateEditUser from "@/components/templatePages/templateEditUser.vue";

export default {
    name: 'ProfilePage',
    components: {templateEditUser},
    computed: {
        ...mapGetters(['USER'])
    }
}
