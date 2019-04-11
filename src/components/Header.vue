<template>
  <navbar>
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
    <a class="navbar-brand" href="https://www.iviewui.com/docs/guide/install"></a>
    <ul class="nav navbar-nav d-md-down-none">
      <li class="nav-item">
        <a class="nav-link navbar-toggler sidebar-toggler"  @click="sidebarMinimize">&#9776;</a>
      </li>
    </ul>
    <ul class="nav navbar-nav d-md-down-none">
       <li class="nav-item header-item">
          <router-link tag="div" to='/'  style="height:55px;" class="nav-link">
            <p><Icon type="md-card" size='30' color="#2d8cf0"/></p>
            <p  style="color:white"> home </p>
          </router-link>
      </li>
      <li class="nav-item header-item">
        <router-link tag="div" to='/homeone'  style="height:55px;" class="nav-link">
            <p><Icon type="ios-contact" size='30' color="#2d8cf0"/></p>
            <p  style="color:white"> homeone </p>
        </router-link>
      </li>
        <li class="nav-item header-item">
        <router-link tag="div" to='/hometwo' style="height:55px;" class="nav-link">
            <p><Icon type="md-cube" size='30' color="#2d8cf0"/></p>
            <p style="color:white"> hometwo </p>
        </router-link>
    </li>
        <li class="nav-item header-item">
            <Dropdown>
                <router-link tag="div" to='/homex' style="height:55px;" class="nav-link">
                    <p>
                        <Icon type="md-disc" size='30' color="#2d8cf0"/>
                    </p>
                    <p style="color:white"> 云服务器 </p>
                </router-link>
                <DropdownMenu slot="list">
                  <DropdownItem>Linux</DropdownItem>
                  <DropdownItem>Mac OS X</DropdownItem>
                  <DropdownItem>Windows</DropdownItem>
                  <DropdownItem>Core OS</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </li>
    </ul>
      <ul class="nav navbar-nav ml-auto">
          <li class="nav-item d-md-down-none">
              <a class="nav-link">
              		<Icon type="md-alarm" size="20"/>
                  <span class="badge badge-pill badge-danger">5</span>
              </a>
          </li>
          <Dropdown class="nav-item" trigger="click">
              <a href="javascript:void(0)">
                   <span slot="button">
                   <Tooltip content="点击换头像" placement="left-end">
                    <img src="static/img/avatars.jpg" class="img-avatar" alt="o">
                     <Upload action="http://139.196.78.39:9000/api/User/UploadFile" class="picupload">
                        <Button icon="ios-cloud-upload-outline"></Button>
                     </Upload>
                    </Tooltip>
                    <span class="d-md-down-none">管理员</span>
                    <Icon type="md-person" />
                    
                  </span>
              </a>
              <Dropdown-menu slot="list">
                  <Dropdown-item>
                      <p class="dropdown-itemp">
                          <Icon type="ios-person-outline" /> 个人中心
                      </p>
                  </Dropdown-item>
                  <Dropdown-item>
                      <p class="dropdown-itemp">
                          <Icon type="ios-card-outline" /> 设置
                      </p>
                  </Dropdown-item>
                  <Dropdown-item>
                    <a href="" @click="Logout">
                      <p class="dropdown-itemp">
                          <Icon type="ios-power"/>退出
                      </p>
                    </a>
                  </Dropdown-item>
              </Dropdown-menu>
          </Dropdown>
          <li class="nav-item d-md-down-none">
              <a class="nav-link navbar-toggler aside-menu-toggler" @click="asideToggle">&#9776;</a>
          </li>
      </ul>
  </navbar>
</template>
<script>

import navbar from './Navbar'

export default {
  name: 'header',
  components: {
    navbar,

  },
  methods: {
    Logout(e){
         e.preventDefault();
         this.$store.dispatch('LogOut').then(() => {
            this.$router.push({ path: '/login' });
          }).catch(err => {
            this.$message.error(err);
          });
    },
    click () {
      // do nothing
    },
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()

      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    }
  }
}
</script>

<style type="text/css" scoped>
  .dropdown-itemp{
    text-align: left;
    font-size: 15px;
    padding: 10px;
  }
 .header-item .ivu-dropdown-item{
  padding: 15px;
}
  .header-item{
    width: 130px;
    /*background-color: #20a8d8;*/
    /*background-color: white;*/
    height: 55px;
  }
  .header-item a{
        color:white !important;
  }
  .d-md-down-none{margin-left: 5px;}
  .picupload{position: absolute;left: 0;top: 0;}
  .picupload  button{height: 50px;width: 50px;opacity: 0;overflow: hidden}
</style>
