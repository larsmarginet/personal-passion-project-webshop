<template>
    <section>
        <h2 style="display: none">Merchandise</h2>
        <Alert @dismissed="onDismissed" :text="error" v-if="error"/>
        <v-row v-if="loading">
            <v-col cols="12" sm="6" md="4" lg="3" v-for="item in merch" :key="item.id">
                <v-card class="pa-4 rounded-lg" flat>
                    <v-skeleton-loader type="image"></v-skeleton-loader>
                    <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else-if="!loading && merch">
            <v-col cols="12" class="pb-0">
                <v-row>
                    <h3 style="display: none">Filter</h3>
                    <v-icon class="primary--text mr-2">filter_list</v-icon>
                    <label :for="category.category" class="filter mr-2" v-for="(category,i) in categories" :key="i">
                        <input type="checkbox" :id="category.category" class="filter-input" @click="handleFilter(category.category)" @keypress.enter="handleFilter(category.id)">
                        <span class="filter-button">
                            <v-icon class="mt-n1 filter-icon">{{category.icon}}</v-icon>
                            <span class="filter-label">{{category.category}}</span>
                        </span>
                    </label>
                </v-row>
            </v-col>
            <v-col class="pt-0">
                <transition-group name="list" tag="div" class="row">
                    <v-col cols="12" sm="6" md="4" lg="3" v-for="item in filteredMerch" :key="item.id">
                        <MerchCard :item="item"/>
                    </v-col>
                </transition-group>
            </v-col>
        </v-row>
    </section>
</template>

<script>
import MerchCard from '../components/merch/MerchCard';
import Alert from '../components/shared/Alert';
export default {
    components: {
        MerchCard,
        Alert
    },
    data() {
        return {
            categories: [
                { category: 'clothing', icon: 'checkroom' },
                { category: 'album', icon: 'album' },
                { category: 'gadget', icon: 'local_mall' },
                { category: 'print', icon: 'receipt' }
            ],
            filter: []
        }
    },
    computed: {
        merch() {
            return this.$store.getters['merch/merch'];
        },
        filteredMerch() {
            if (this.filter.length > 0) {
                return this.merch.filter((el) => {
                    return this.filter.some((f) => {
                        return f == el.category;
                    });
                });
            } else {
                return this.merch;
            }
        },
        loading() {
            return this.$store.getters['merch/loading'];
        },
        error() {
            return this.$store.getters['merch/error'];
        }
    },
    methods: {
        onDismissed() {
            this.$store.dispatch('merch/clearError');
        },
        handleFilter(category) {
            this.filter.includes(category) ? this.filter.splice(this.filter.indexOf(category), 1) : this.filter.push(category);
        }
    },
    mounted() {
        this.$store.dispatch('setLoadingComponent', false);
        this.$store.dispatch('merch/loadMerch');
    }
}
</script>

<style scoped>
.sort {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.filter-input {
    position: absolute;
    opacity: 0;
    width: 55px;
    height: 55px;
    top: 12px;
}

.filter-button {
    display: block;
    width: 55px;
    height: 55px;
    color: #6fcf97;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 2px solid #6fcf97;
    cursor: pointer;
}

.filter-label {
    font-size: 10px;
    line-height: 1;
}

.filter-icon {
    color: #6fcf97;
}

.filter-input:checked + .filter-button {
    background-color: #6fcf97;
    color: white;
}

.filter-input:checked + .filter-button .filter-icon {
    color: white;
}

.list-enter {
    opacity: 0;
    transform: translateY(-15px);
}

.list-enter-active {
    transition: all 500ms ease-in-out;
}

.list-enter-to {
    opacity: 1;
    transform: translateY(0);
}
</style>
