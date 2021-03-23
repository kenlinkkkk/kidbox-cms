<template>
  <div id="data-list-list-view" class="data-list-container">

    <notification-content-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />

    <content-detail :isSidebarActive="detailSidebar" @closeSidebar="toggleDetailSidebar" :data="sidebarDetailData"/>

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
        <vs-th sort-key="name">Tiêu đề</vs-th>
        <vs-th sort-key="status">Nội dung</vs-th>
        <vs-th sort-key="status" v-if="$acl.check('admin')">Trường</vs-th>
        <vs-th sort-key="status" v-if="$acl.check('systemAdmin')">Lớp</vs-th>
        <vs-th sort-key="status" v-if="$acl.check('systemAdmin')">Phụ huynh</vs-th>
        <vs-th sort-key="order_status" v-if="$acl.check('admin')">Trạng thái</vs-th>
        <vs-th>Action</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

          <vs-td>
            <p class="title">{{ tr.title }}</p>
          </vs-td>

          <vs-td>
            <p class="product-content">{{ tr.content  }}</p>
          </vs-td>

          <vs-td v-if="$acl.check('admin')">
            <div  class="product-schools">{{tr.school.length}} trường
            </div>
          </vs-td>

          <vs-td v-if="$acl.check('systemAdmin')">
            <div class="product-class">{{tr.class_rooms.length}} lớp
            </div>
          </vs-td>

          <vs-td v-if="$acl.check('systemAdmin')">
            <div class="product-child" >{{tr.children.length}} phụ huynh
            </div>
          </vs-td>

          <vs-td v-if="$acl.check('admin')">
            <vs-chip :color="getOrderStatusColor(tr.status)" class="product-order-status" >{{getStatus(tr.status)}}</vs-chip>
          </vs-td>


          <vs-td class="whitespace-no-wrap">
            <feather-icon icon="InfoIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="detailData(tr)"/>
            <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" class="ml-2" @click.stop="editData(tr)" />
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
  import moduleNotificationContent from '@/store/notificationcontent/notificationcontentStore.js'
  import NotificationContentSidebar from "./notificationContentSidebar";
  import ContentDetail from "./components/contentDetail"

  export default {
    components: {
      NotificationContentSidebar,
      ContentDetail
    },
    data () {
      return {
        currentx: 1,
        limit : 10,
        selected: [],
        // products: [],
        isMounted: false,

        // Data Sidebar
        addNewDataSidebar: false,
        detailSidebar: false,
        sidebarData: {},
        sidebarDetailData: {}
      }
    },
    computed: {

      totalPages(){
        return this.$store.getters["notificationContent/getTotalPages"]
      },
      packages () {
        return this.$store.getters["notificationContent/getNotificationContents"]
      },
      // queriedItems () {
      //   return this.$refs.table ? this.$refs.table.queriedResults.length : this.products.length
      // }
    },
    methods: {
      changePage(){
        this.$store.dispatch('notificationContent/getAll', {"limit": this.limit, "page": this.currentx});
      },
      addNewData () {
        this.sidebarData = {}
        this.toggleDataSidebar(true)
      },
      deleteData (id) {
        this.$store.dispatch('notificationContent/deactivate', id).then((resp) => {

          this.$store.dispatch('notificationContent/getAll', {"limit": this.limit, "page": this.currentx});

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
      detailData (data) {
        this.sidebarDetailData = data
        this.toggleDetailSidebar(true)
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
      },
      toggleDetailSidebar (val = false) {
        this.detailSidebar = val
      }
    },
    created () {
      if (!moduleNotificationContent.isRegistered) {
        this.$store.registerModule('notificationContent', moduleNotificationContent)
        moduleNotificationContent.isRegistered = true
      }
      this.$store.dispatch('notificationContent/getAll', {"limit": this.limit, "page": this.currentx})
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
