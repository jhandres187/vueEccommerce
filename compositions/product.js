app.component("product",{//nombre y opciones del componente
    template: /* vue-html */`
    <section class="product">
        <div class="product__thumbnails">
            <div 
                v-for="(image, index) in product.images"
                :key="image.thumbnail"
                class="thumb" 
                :class="{ active: activeImage === index}" 
                :style="{ backgroundImage : 'url(' + product.images[index].thumbnail + ')' }"
                @click="activeImage = index"
            ></div>
        </div>
        <div class="product__image">
            <img :src="product.images[activeImage].image" :alt="product.name" />
        </div>
    </section>
    <section class="description">
        <h4>{{ product.name.toUpperCase() }} {{ product.stock === 0 ? "😢":"😊" }}</h4>
        <badge :product="product"></badge>
        <p class="description__status" v-if="product.stock > 3">Hay Unidades Disponibles</p>
        <p class="description__status" v-else-if="product.stock === 3">Quedan pocas Unidades</p>
        <p class="description__status" v-else-if="product.stock === 2">El producto esta por terminarse</p>
        <p class="description__status" v-else-if="product.stock === 1">Ultima unidad Disponible</p>
        <p class="description__status" v-else-if="product.stock === 0">No hay Unidades</p>
        <p class="description__price">$ {{ new Intl.NumberFormat("es-CO").format(product.price) }}</p>
        <p class="description__content">
            {{ product.content }}
        </p>
        <div class="discount">
            <span>codigo de descuento</span>
            <!-- <input type="text" placeholder="Ingresa tu codigo" @keyup.enter="product.price *= 50/100" /> -->
            <input type="text" placeholder="Ingresa tu codigo" @keyup.enter="applyDiscount($event)" />

        </div>
        <button :disabled="product.stock === 0" @click="sendToCart()">{{ product.stock > 0 ? "Añadir a Carrito" : "Agotado"}}</button>
    </section>
    `,
    props : ["product"],
    emits: ["sendtocart"],
    setup(props, context){
        const productState = reactive({
            activeImage: 0
        });
        const discountCodes = ref(["PLATZI20", "PLATZI21", "PLATZI22"]);
        function applyDiscount(event){
            const discountCodeIndex = discountCodes.value.indexOf(event.target.value);
            if(discountCodeIndex >= 0){
                props.product.price *= 50/100;
                discountCodes.value.splice(discountCodeIndex, 1);
            }
        }
        function sendToCart() { 
            context.emit("sendtocart", props.product);
        }
        return {
            ...toRefs(productState),
            sendToCart,
            applyDiscount,
        }
    }
    
})