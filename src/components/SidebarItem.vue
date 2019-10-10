<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <ul class="nav">
        <template v-for="itemPar in routes" >
          <router-link class="nav-item nav-dropdown parentLis" v-if="!itemPar.hidden&&itemPar.children&&itemPar.children.length>0" :to="itemPar.path+''+itemPar.children[0].path"  tag="li" disabled>
            <div class="nav-link nav-dropdown-toggle parentsDivs" @click="handleClick">
              <Icon :type="itemPar.icon" color="white"/>{{ itemPar.name}}
            </div>
            <ul class="nav-dropdown-items parentMenus">
              <template v-for="itemChi in itemPar.children">
                <router-link class="nav-item nav-dropdown" v-if="!itemChi.hidden&&itemChi.children&&itemChi.children.length>0" :to="itemChi.path+''+itemChi.children[0].path"  tag="li" disabled>
                  <div class="nav-link nav-dropdown-toggle" @click="handleClick">
                    <Icon :type="itemChi.icon"/>{{ itemChi.name}}
                  </div>
                  <ul class="nav-dropdown-items childMenus">
                    <li class="nav-item" v-for="childGro in itemChi.children" v-if='!childGro.hidden' @click="addActive">
                      <router-link :to="itemPar.path+'/'+itemChi.path+'/'+childGro.children[0].path" class="nav-link" v-if="!childGro.hidden&&childGro.children" style="padding-left: 50px;">
                        <Icon :type="childGro.icon" color="white"/>{{childGro.name}}
                      </router-link>
                      <router-link :to="itemPar.path+'/'+itemChi.path+'/'+childGro.path" class="nav-link" v-else="!childGro.children" style="padding-left: 50px;">
                        <Icon :type="childGro.icon" color="white"/>{{childGro.name}}
                      </router-link>
                    </li>                    
                  </ul>
                </router-link>
                <li class="nav-item" v-if="!itemChi.hidden&&!itemChi.children">
                  <router-link :to="itemPar.path+'/'+itemChi.path" class="nav-link" exact>
                    <Icon :type="itemChi.icon" color="white"/>{{itemChi.name}}
                  </router-link>
                </li>
              </template>
            </ul>
          </router-link>
          <li class="nav-item" v-if="!itemPar.hidden&&!itemPar.children">
            <router-link :to="itemPar.path" class="nav-link" exact>
              <Icon :type="itemPar.icon" color="white"/>{{itemPar.name}}
            </router-link>
          </li>
        </template>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'SidebarItem',
  props: {
      routes: {
          type: Array
      }
  },
  created(){
    //console.log(this.routes)
  },
  methods: {
      handleClick(e) {
        e.preventDefault()
        let eOneself = e.target.parentElement;
        eOneself.className.indexOf('open') > 0 ? $(eOneself).removeClass('open') : $(eOneself).addClass('open').siblings().removeClass('open');
      },
      addActive(e) {
        e.preventDefault()
        e.target.parentElement.parentElement.parentElement.classList.add('open')
        let eTwoself=e.target.parentElement.parentElement.parentElement;
        $(eTwoself).siblings('li').removeClass('open');
      }
  },
  mounted() {
     
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .wscn-icon {
      margin-right: 10px;
  }

  .hideSidebar .menu-indent {
      display: block;
      text-indent: 10px;
  }
  .sidebar-nav::-webkit-scrollbar {/*滚动条整体样式*/
      width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
  }
  .sidebar-nav::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: rgba(0,0,0,0.2);
  }
  .sidebar-nav::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 0;
      background: rgba(0,0,0,0.1);
  }
</style>

