<template>
  <div class="px-6 pb-2 pt-6">
    <vs-dropdown vs-trigger-click class="cursor-pointer">
      <div class="p-3 shadow-drop rounded-lg d-theme-dark-light-bg cursor-pointer flex items-end justify-center text-lg font-medium w-48">
        <span class="mr-2 leading-none">Thêm mới</span>
        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
      </div>
      <vs-dropdown-menu>
        <vs-dropdown-item @click="displayTypeAddPrompt">
          <span class="flex items-center w-50">
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" class="mr-2" />
            <span>Loại csvc</span>
          </span>
        </vs-dropdown-item>
        <vs-dropdown-item @click="displayInfrastructureAddPrompt">
                <span class="flex items-center w-50">
                  <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>CSVC</span>
                </span>
        </vs-dropdown-item>
      </vs-dropdown-menu>
    </vs-dropdown>

    <type-add-prompt
      :activeInfrastructureTypeAddPrompt="infrastructureTypePrompt"
      @hiddenTypeAddPrompt="hiddenTypeAddPrompt"/>
    <infrastructure-add-prompt
      :activeInfrastructureAddPrompt="infrastructurePrompt"
      @hiddenInfrastructureAddPrompt="hiddenInfrastructureAddPrompt"/>
  </div>
</template>

<script>
  import TypeAddPrompt from "./TypeAddPrompt";
  import InfrastructureAddPrompt from "../infrastructure/InfrastructureAddPrompt";

  export default {
    data() {
      return {
        infrastructureTypePrompt : false,
        infrastructurePrompt : false
      }
    },
    computed: {

    },
    methods: {
      displayTypeAddPrompt() {
        this.infrastructureTypePrompt = true;
      },
      hiddenTypeAddPrompt() {
        this.infrastructureTypePrompt = false;
      },
      displayInfrastructureAddPrompt() {
        this.infrastructurePrompt = true;
      },
      hiddenInfrastructureAddPrompt() {
        this.infrastructurePrompt = false;
      },
    },
    components: {
      TypeAddPrompt,
      InfrastructureAddPrompt
    }
  }
</script>
