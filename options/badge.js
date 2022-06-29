app.component("badge",{
    template: /* vue-html */`
    <span class="badge new" v-if="product.badge.new">Nuevo</span>
    <span class="badge offer" v-if="product.badge.offer">Oferta</span>
    `,
    props: ["product"],
    
})