<template>
  <div>
    <v-list :color="listColor" dense>

      <v-list-item>
        <v-list-item-icon>
          <icons name="runtimeVersion" />
        </v-list-item-icon>
        <v-list-item-content>
          <span>{{ fields.value }}</span>
        </v-list-item-content>
      </v-list-item>

     
    </v-list>
  </div>
</template>
<script>
import icons from "@/components/icons";

export default {
  components: {
    icons,
  },
  props: {
    fields: Object,
    listColor: String,
  }
};
</script>
<style scoped>
a:link {
  color: #f5f5f5;
}

a:visited {
  color: #f5f5f5;
}

a:active {
  color: #f5f5f5;
}
a:link {
  color: #f5f5f5;
}
</style>
