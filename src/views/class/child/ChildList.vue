<template>

  <div id="page-user-list">
    <div class="vx-card p-6">
      <div class="flex flex-wrap items-center">
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ usersData.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : usersData.length }} of {{ usersData.length }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
<!--             <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button>-->
            <vs-dropdown-menu>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(10)">
                <span>10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(25)">
                <span>25</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(30)">
                <span>30</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
        <vs-input class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Tìm kiếm..." />
        <!-- <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Export as CSV</vs-button> -->

        <!-- ACTION - DROPDOWN -->
        <vs-dropdown vs-trigger-click class="cursor-pointer">

          <div class="p-3 shadow-drop rounded-lg d-theme-dark-light-bg cursor-pointer flex items-end justify-center text-lg font-medium w-48">
            <span class="mr-2 leading-none">Hành động</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>

          <vs-dropdown-menu>
            <vs-dropdown-item>
                <span class="flex items-center w-40">
                  <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" class="mr-2" />
<!--                  <span @click="addUser">Thêm mới</span>-->
                  <span>Thêm mới</span>
                </span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>


      <!-- AgGrid Table -->
      <ag-grid-vue
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="usersData"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl">
      </ag-grid-vue>

      <vs-pagination
        :total="totalPages"
        v-model="currentPage"/>

    </div>
  </div>

</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import vSelect from "vue-select";
import CellRendererActions from "@/views/class/child/cell-renderer/CellRendererActions";
import CellRendererGender from "@/views/class/child/cell-renderer/CellRendererGender";
import CellRendererPicture from "@/views/class/child/cell-renderer/CellRendererPicture";
import CellRendererDoB from "@/views/class/child/cell-renderer/CellRendererDoB";

export default {
  data () {
    return {
      configLoadPage: {
        page: 1,
        size: 10,
        school_id: this.$store.state.AppActiveUser.schoolId,
        class_id: Number.parseInt(this.$route.params.classId)
      },

      searchQuery: '',

      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: 'ID',
          field: 'id',
          width: 125,
          filter: true,
          checkboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          headerCheckboxSelection: true
        },
        {
          headerName: 'Ảnh',
          filter: false,
          width: 100,
        },
        {
          headerName: 'Tên',
          field: 'name',
          filter: true,
          width: 200
        },
        {
          headerName: 'Biệt danh',
          field: 'nickname',
          filter: false,
          width: 200
        },
        {
          headerName: 'Ngày sinh',
          filter: true,
          width: 200,
        },
        {
          headerName: 'Giới tính',
          filter: false,
          width: 150,
          cellRendererFramework: 'CellRendererGender'
        },
        {
          headerName: 'Hành động',
          width: 150,
          cellRendererFramework: 'CellRendererActions'
        }
      ],
      components: {
        CellRendererActions,
        CellRendererGender,
        CellRendererPicture,
        CellRendererDoB
      }
    }
  },
  components: {
    AgGridVue,
    vSelect,
    CellRendererActions,
    CellRendererGender,
    CellRendererPicture,
    CellRendererDoB
  },
  methods: {
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    },
  },
  computed: {
    usersData () {
      return this.$store.getters['child/getListChild'];
    },
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 10
    },
    totalPages () {
      let paginate = this.$store.getters['child/getPaginate']
      if (paginate.totalPages) return paginate.totalPages
      else return 0
    },
    currentPage: {
      get () {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set (val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
    }
  },
  mounted () {
    this.gridApi = this.gridOptions.api

    /* =================================================================
      NOTE:
      Header is not aligned properly in RTL version of agGrid table.
      However, we given fix to this issue. If you want more robust solution please contact them at gitHub
    ================================================================= */
    if (this.$vs.rtl) {
      const header = this.$refs.agGridTable.$el.querySelector('.ag-header-container')
      header.style.left = `-${  String(Number(header.style.transform.slice(11, -3)) + 9)  }px`
    }
  },
  created() {
    this.$store.dispatch('child/getChildByIdClass', this.configLoadPage)
  }
}
</script>

<style lang="scss" scoped>
#page-user-list {
  .user-list-filters {
    .vs__actions {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-58%);
    }
  }
}
</style>
