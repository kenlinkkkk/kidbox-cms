<template>
  <div id="data-list-list-view" class="data-list-container">

    <sub-package-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />

    <vs-table ref="table" multiple v-model="selected"  search :data="packages">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">

          <!-- ADD NEW -->
          <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">Thêm mới</span>
          </div>
        </div>
      </div>

      <template slot="thead">
        <vs-th sort-key="name">Tên</vs-th>
        <vs-th sort-key="description">Mô tả</vs-th>
        <vs-th sort-key="price">Giá</vs-th>
        <vs-th sort-key="category">Thời hạn</vs-th>
        <vs-th sort-key="popularity">Số lượng người dùng</vs-th>
        <vs-th sort-key="note">Ghi chú</vs-th>
        <vs-th sort-key="order_status">Trạng thái</vs-th>
        <vs-th>Action</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.name }}</p>
          </vs-td>

          <vs-td>
            <p class="product-description">{{ tr.description  }}</p>
          </vs-td>

          <vs-td>
            <p class="product-price">{{ tr.price }} vnđ</p>
          </vs-td>

          <vs-td>
            <p class="product-duration">{{ tr.duration  }}</p>
          </vs-td>

          <vs-td>
            <p class="product-number_of_user">{{ tr.number_of_user  }}</p>
          </vs-td>

          <vs-td>
            <p class="product-note">{{ tr.note  }}</p>
          </vs-td>

          <vs-td>
            <vs-chip :color="getOrderStatusColor(tr.status)" class="product-order-status" >{{getStatus(tr.status)}}</vs-chip>
          </vs-td>



          <vs-td class="whitespace-no-wrap">
            <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" />
            <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(tr.id)" />
          </vs-td>

        </vs-tr>
        </tbody>


      </template>
    </vs-table>
    <div class="mt-5">
      <vs-pagination :total=totalPages v-model=currentx @change="changePage"></vs-pagination>
    </div>
  </div>
</template>

<script>
  import SubPackageSidebar from './subPackageSidebar'
  import moduleSubPackage from '@/store/subpackage/subPackageStore.js'

  export default {
    components: {
      SubPackageSidebar
    },
    data () {
      return {
        currentx: 1,
        selected: [],
        // products: [],
        isMounted: false,

        // Data Sidebar
        addNewDataSidebar: false,
        sidebarData: {}
      }
    },
    computed: {

      totalPages(){
        return this.$store.getters["subpackage/getTotalPages"]
      },
      packages () {
        return this.$store.getters["subpackage/getPackages"]
      },
      // queriedItems () {
      //   return this.$refs.table ? this.$refs.table.queriedResults.length : this.products.length
      // }
    },
    methods: {
      changePage(){
        this.$store.dispatch('subpackage/getListSubPackages', this.currentx);
      },
      addNewData () {
        this.sidebarData = {}
        this.toggleDataSidebar(true)
      },
      deleteData (id) {
        this.$store.dispatch('subpackage/deactiveSubPackage', id).then((resp) => {

          this.$store.dispatch('subpackage/getListSubPackages', this.currentx);

          this.$vs.notify({
            title:'Xóa thành công',
            text: resp.data.message,
            position: 'top-right',
            color:'success',
            iconPack: 'feather',
            icon:'icon-check'
          });
        }).catch((error) => {
          this.$vs.notify({
            title:'Lỗi',
            text: error.message,
            position: 'top-right',
            color:'danger',
            iconPack: 'feather',
            icon:'icon-x'
          });
        })
      },
      editData (data) {
        // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
        this.sidebarData = data
        this.toggleDataSidebar(true)
      },
      getOrderStatusColor (status) {
        if (status === 0)   return 'warning'
        if (status === 1) return 'success'
        if (status === null)  return 'danger'
        return 'primary'
      },
      getStatus(status){
        if (status === 0)   return 'Deactivate'
        if (status === 1) return 'Activate'
        if (status === null)  return 'Deactivate'
      },
      getPopularityColor (num) {
        if (num > 90)  return 'success'
        if (num > 70)  return 'primary'
        if (num >= 50) return 'warning'
        if (num < 50)  return 'danger'
        return 'primary'
      },
      toggleDataSidebar (val = false) {
        this.addNewDataSidebar = val
      }
    },
    created () {
      if (!moduleSubPackage.isRegistered) {
        this.$store.registerModule('subpackage', moduleSubPackage)
        moduleSubPackage.isRegistered = true
      }
      this.$store.dispatch('subpackage/getListSubPackages')
    },
    mounted () {
      this.isMounted = true
    }
  }
</script>

<style lang="scss">
  #data-list-list-view {
    .vs-con-table {

      /*
        Below media-queries is fix for responsiveness of action buttons
        Note: If you change action buttons or layout of this page, Please remove below style
      */
      @media (max-width: 689px) {
        .vs-table--search {
          margin-left: 0;
          max-width: unset;
          width: 100%;

          .vs-table--search-input {
            width: 100%;
          }
        }
      }

      @media (max-width: 461px) {
        .items-per-page-handler {
          display: none;
        }
      }

      @media (max-width: 341px) {
        .data-list-btn-container {
          width: 100%;

          .dd-actions,
          .btn-add-new {
            width: 100%;
            margin-right: 0 !important;
          }
        }
      }

      .product-name {
        max-width: 23rem;
      }

      .vs-table--header {
        display: flex;
        flex-wrap: wrap;
        margin-left: 1.5rem;
        margin-right: 1.5rem;
        > span {
          display: flex;
          flex-grow: 1;
        }

        .vs-table--search{
          padding-top: 0;

          .vs-table--search-input {
            padding: 0.9rem 2.5rem;
            font-size: 1rem;

            &+i {
              left: 1rem;
            }

            &:focus+i {
              left: 1rem;
            }
          }
        }
      }

      .vs-table {
        border-collapse: separate;
        border-spacing: 0 1.3rem;
        padding: 0 1rem;

        tr{
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          td{
            padding: 20px;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
          }
          td.td-check{
            padding: 20px !important;
          }
        }
      }

      .vs-table--thead{
        th {
          padding-top: 0;
          padding-bottom: 0;

          .vs-table-text{
            text-transform: uppercase;
            font-weight: 600;
          }
        }
        th.td-check{
          padding: 0 15px !important;
        }
        tr{
          background: none;
          box-shadow: none;
        }
      }

      .vs-table--pagination {
        justify-content: center;
      }
    }
  }
</style>
