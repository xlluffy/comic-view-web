<template>
  <div class="text-center" v-if="!users">
    <h4>加载中</h4>
  </div>
  <div v-else>
    <nav-pag :action="fetchData" :pages="users"></nav-pag>
    <div class="row">
      <sidebar-admin></sidebar-admin>
      <div class="col">
        <table class="table table-striped justify-content-center">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">用户名</th>
            <th scope="col">创建时间</th>
            <th scope="col">用户角色</th>
            <th scope="col">增加角色</th>
            <th scope="col">移除角色</th>
            <th scope="col">禁用/启用</th>
            <!--                    <th scope="col">删除用户</th>-->
          </tr>
          </thead>
          <tbody>
          <tr :key="index" v-for="(user, index) of users.list">
            <th scope="row">{{ index + users.startRow }}</th>
            <td>{{ user.username }}</td>
            <td>{{ formatDate(user.createTime )}}</td>
            <td>{{ roles[user.id].join(',') }}</td>
            <td>
              <select @change="addRole(user.id, $event)" class="add-roles form-control">
                <option disabled selected value="">Choose...</option>
                <option :key="role.id" :value="role" v-for="role of addableRoles(roles[user.id])">
                  {{ role }}
                </option>
              </select>
            </td>
            <td>
              <select @change="removeRole(user.id, $event)" class="remove-roles form-control">
                <option disabled selected value="">Choose...</option>
                <option :key="role.id" :value="role" v-for="role of removableRoles(roles[user.id])">
                  {{ role }}
                </option>
              </select>
            </td>
            <td>
              <input :checked="user.status" @change="toggleStatus(user.id, $event)"
                     class="status-checkbox" type="checkbox"/>
            </td>
            <!--<td>
                <a th:href="@{/admin/account/deleteUser(userId=${user.id})}" class="delete-user">删除</a>
            </td>-->
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <nav-pag :action="fetchData" :pages="users"></nav-pag>
  </div>
</template>

<script>
  import NavPag from "@/components/Nav/NavPag";
  import SidebarAdmin from "@/components/Sidebar/SidebarAdmin";
  import {formatDate} from "@/utils/utils";
  // eslint-disable-next-line no-unused-vars
  import {hasPermission} from "@/api/auth"
  import {service} from "@/api/api";

  export default {
    name: "Account",
    components: {SidebarAdmin, NavPag},
    data() {
      return {
        users: null,
        allRoles: null,
        roles: null
      }
    },

    created() {
      this.fetchData();
    },

    methods: {
      formatDate: dataString => formatDate(dataString),

      addableRoles(roles) {
        return this.allRoles.filter(role =>  {
          if (!roles.includes(role)) {
            return !(role === 'ROLE_LADMIN' && !hasPermission('ROLE_LADMIN'));
          }
          return false
        })
      },

      removableRoles(roles) {
        return roles.filter(role => !(role === 'ROLE_LADMIN' && !hasPermission('ROLE_LADMIN')))
      },

      fetchData() {
        service.get('/api/admin/account/index', {
          params: this.$route.query
        }).then(resp => {
          this.users = resp['users'];
          this.allRoles = resp['all_roles'];
          this.roles = resp['roles']
        })
      },

      addRole(userId, event) {
        this.postRequest('/api/admin/account/addRole', {
          userId,
          role: event.target.value
        }).then(() => {
          this.roles[userId].push(event.target.value);
          event.target.selectedIndex = 0
        })
      },

      removeRole(userId, event) {
        this.postRequest('/api/admin/account/removeRole', {
          userId,
          role: event.target.value
        }).then(() => {
          this.roles[userId].splice(event.target.selectedIndex - 1, 1);
          event.target.selectedIndex = 0
        })
      },

      toggleStatus(userId, event) {
        if (event.target.checked) {
          this.postRequest('/api/admin/account/enabledUser', {
            userId
          })
        } else {
          this.postRequest('/api/admin/account/disabledUser', {
            userId
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>