<template>
  <div class="px-6 pb-2 pt-6">
    <vs-dropdown vs-trigger-click class="cursor-pointer">
      <div class="p-3 shadow-drop rounded-lg d-theme-dark-light-bg cursor-pointer flex items-end justify-center text-lg font-medium w-48">
        <span class="mr-2 leading-none">Thêm mới</span>
        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
      </div>
      <vs-dropdown-menu>
        <vs-dropdown-item @click="displayTypePrompt">
          <span class="flex items-center w-50">
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" class="mr-2" />
            <span>Loại csvc</span>
          </span>
        </vs-dropdown-item>
        <vs-dropdown-item @click="displayInfrastructurePrompt">
                <span class="flex items-center w-50">
                  <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>CSVC</span>
                </span>
        </vs-dropdown-item>
      </vs-dropdown-menu>
    </vs-dropdown>

    <type-prompt
      :activeInfrastructureTypePrompt="activeInfrastructureTypePrompt"
      @hiddenTypePrompt="hiddenTypePrompt"></type-prompt>
    <infrastructure-prompt
      :activeInfrastructurePrompt="activeInfrastructurePrompt"
      @hiddenInfrastructurePrompt="hiddenInfrastructurePrompt"></infrastructure-prompt>

  </div>
</template>

<script>
  import TypePrompt from "./TypePrompt";
  import InfrastructurePrompt from "./InfrastructurePrompt";

  export default {
    data() {
      return {
        activeInfrastructureTypePrompt : false,
        activeInfrastructurePrompt : false
      }
    },
    computed: {

    },
    methods: {
      displayTypePrompt() {
        this.activeInfrastructureTypePrompt = true;
      },
      hiddenTypePrompt() {
        this.activeInfrastructureTypePrompt = false;
      },
      displayInfrastructurePrompt() {
        this.activeInfrastructurePrompt = true;
      },
      hiddenInfrastructurePrompt() {
        this.activeInfrastructurePrompt = false;
      },
    },
    components: {
      TypePrompt,
      InfrastructurePrompt
    }
  }
</script>
