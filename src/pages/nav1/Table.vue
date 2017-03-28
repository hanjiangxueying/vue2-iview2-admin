<template>
    <div>
        <Table :context="self" :data="tableData" :columns="tableColumns" stripe border></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="page" @on-change="changePage" show-total></Page>
            </div>
        </div>
    </div>
</template>
<script>
import {
        getUserListPage,
        removeUser,
        editUser,
        addUser
    } from '../../api/api';
    export default {
        data () {
            return {
                self: this,
                tableData: [],
                total: 0,
                page: 1,
                tableColumns: [
                     {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '名字',
                        key: 'name',
                        align: 'center',
                        sortable: true
                      
                    },
                    {
                        title: '地址',
                        align: 'center',
                        key: 'addr',
                        width: 300
                    },
                    {
                        title: '年龄',
                        align: 'center',
                        key: 'age'
                    },
                    {
                        title: '生日',
                        align: 'center',
                        key: 'birth'
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        align: 'center',
                        render: function(row, column, index){
                               return row.sex == 0 ? '男' : '女';
                        }
                    },
                     {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="show(${index})">查看</i-button> <i-button type="error" size="small" @click="remove(${row.id})">删除</i-button>`;
                        }
                    }
                ]
            }
        },
        methods: {
            mockTableData () {
               let para = {
                    page: this.page
                };
                this.$Loading.start();
               getUserListPage(para).then((res) => {
                   this.$Loading.finish();
                    this.total = res.data.total;
                    this.tableData = res.data.users;
                   
                });
            },
            show (index) {
                this.$Modal.info({
                    title: '用户信息',
                    content: `姓名：${this.tableData[index].name}<br>年龄：${this.tableData[index].age}<br>地址：${this.tableData[index].addr}`
                })
            },
            remove (index) {
                 let self = this;
                 this.$Modal.confirm({
                    title: '用户信息',
                    content: `是否删除此记录`,
                    onOk: function(){
                        this.$Loading.start();
                        let para = {id: index}
                         removeUser(para).then((res)=> {
                            self.mockTableData();
                      });
                    }
                })
            },
            changePage (row) {
                // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
                console.log(row);
                this.page = row;
                this.mockTableData();
            }
        },
        mounted() {
            this.mockTableData();
        }
    }
</script>