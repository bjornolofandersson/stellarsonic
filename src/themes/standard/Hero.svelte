<script lang="ts">
  export let data: any;
</script>

<div class="bg-white">
  <h1>{data.title}</h1>
  <a href="{data.cta.url}">{data.cta.label}</a>
</div>
