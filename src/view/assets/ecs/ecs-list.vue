<template>
  <Row>
    <Card>
      <Row>
        <Button @click="add"
                v-if="addAccessAll"
                type="primary">添加</Button>&nbsp;
        <Input v-model="hostname_search"
               placeholder="主机名"
               style="width: 200px" />&nbsp;
        <Button @click="search"
                type="primary">搜索</Button>&nbsp;
        <Button @click="clear_search"
                type="warning">刷新</Button>
      </Row>
      <br>
      <Row>
        <Table border
               :columns="columns"
               :data="data">

        </Table>
      </Row>
      <Row>
        <br>
        <Page :total="count"
              :page_size='page_size'
              @on-change="get_ecs_parameter"
              show-elevator
              show-total />
      </Row>
      <Row>

        <Drawer title="添加 Ecs"
                v-model="create"
                width="720"
                :mask-closable="false"
                :styles="styles">
          <Form ref="formData"
                :model="formData"
                :rules="ruleValidate">
            <Row :gutter="32">
              <Col span="12">
              <FormItem label="主机名"
                        label-position="top"
                        prop="hostname">
                <Input v-model="formData.hostname"
                       placeholder="请填写 主机名" />
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="实例ID"
                        label-position="top"
                        prop="instance_id">
                <Input v-model="formData.instance_id"
                       placeholder="实例ID">
                </Input>
              </FormItem>
              </Col>
            </Row>
            <Row :gutter="32">
              <Col span="12">
              <FormItem label="类型"
                        label-position="top"
                        prop="type">
                <Select v-model="formData.type"
                        placeholder="">
                  <Option value="阿里云">阿里云</Option>
                  <Option value="华为云">华为云</Option>
                  <Option value="亚马逊">亚马逊</Option>
                  <Option value="腾讯云">腾讯云</Option>
                  <Option value="其他">其他</Option>
                </Select>
              </FormItem>
              </Col>

            </Row>
            <Row :gutter="32">
              <Col span="12">
              <FormItem label="标签"
                        label-position="top"
                        prop="instance_name">
                <Input v-model="formData.instance_name">
                </Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="系统版本"
                        label-position="top"
                        prop="os_name">
                <Input v-model="formData.os_name"
                       placeholder="" />
              </FormItem>
              </Col>

            </Row>
            <Row :gutter="32">
              <Col span="12">
              <FormItem label="cpu"
                        label-position="top"
                        prop="cpu">
                <InputNumber v-model="formData.cpu"
                             placeholder="">
                </InputNumber>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="内存"
                        label-position="top"
                        prop="memory">
                <InputNumber v-model="formData.memory"
                             placeholder="" />
                </InputNumber>
              </FormItem>
              </Col>
            </Row>
            <Row :gutter="32">
              <Col span="12">
              <FormItem label="内网IP"
                        label-position="top"
                        prop="private_ip">
                <Input v-model="formData.private_ip"
                       placeholder="">
                </Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="外网IP"
                        label-position="top"
                        prop="public_ip">
                <Input v-model="formData.public_ip"
                       placeholder="">
                </Input>
              </FormItem>
              </Col>
            </Row>
          </Form>
          <div class="demo-drawer-footer">
            <Button style="margin-right: 8px"
                    @click="create = false">取消</Button>
            <Button type="primary"
                    @click="handleSubmit('formData')">提交</Button>
          </div>
        </Drawer>

      </Row>
    </Card>
  </Row>
</template>

<script>
import { getEcsList, createEcs, updateEcs, deleteEcs } from '@/api/assets'
import { hasOneOf } from '@/libs/tools'
export default {
  data () {
    return {
      columns: [
        {
          title: '主机名',
          key: 'hostname',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.hostname)
            ])
          }
        },
        {
          title: '主机类型',
          key: 'type'
        },
        {
          title: '实例ID',
          key: 'instance_id'
        },
        {
          title: '标签',
          key: 'instance_name'
        },
        {
          title: '系统版本',
          key: 'os_name'
        },
        {
          title: 'cpu',
          key: 'cpu'
        },
        {
          title: '内存',
          key: 'memory'
        },
        {
          title: '内网IP',
          key: 'private_ip'
        },
        {
          title: '外网IP',
          key: 'public_ip'
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '详情'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  display: (this.updateAccessAll !== true) ? 'none' : 'inline-block'
                },
                on: {
                  click: () => {
                    this.update(params.index)
                  }
                }
              }, '编辑'),
              h('Poptip', {
                props: {
                  confirm: true,
                  title: '确定要删除吗！',
                  transfer: true
                },
                style: {
                  marginRight: '5px',
                  display: (this.deleteAccessAll !== true) ? 'none' : 'inline-block'
                },
                on: {
                  'on-ok': () => {
                    this.remove(params.index, params.row.id)
                  }
                }
              }, [h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  display: (this.deleteAccessAll !== true) ? 'none' : 'inline-block'
                }
              }, '删除')])
            ])
          }
        }
      ],
      data: [],
      count: 0,
      page_size: 10,
      hostname_search: '',
      create: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      updateId: null,
      formData: {
        hostname: '',
        type: '阿里云',
        instance_id: '',
        instance_name: '',
        os_name: '',
        cpu: 1,
        memory: 1,
        private_ip: null,
        public_ip: null
      },
      ruleValidate: {
        hostname: [
          { required: true, message: '此项目必填', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '', trigger: 'blur' }
        ],
        instance_id: [
          { required: true, message: '此项目必填', trigger: 'blur' }
        ],
        instance_name: [
          { required: false, message: '', trigger: 'blur' }
        ],
        os_name: [
          { required: false, message: '', trigger: 'blur' }
        ],
        private_ip: [
          { required: false, message: '', trigger: 'blur' }
        ],
        public_ip: [
          { required: false, message: '', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.get_ecs_list()
  },
  computed: {
    access () {
      return this.$store.state.user.access
    },
    addAccessAll () {
      return hasOneOf(['assets.add_ecs'], this.access)
    },
    updateAccessAll () {
      return hasOneOf(['assets.change_ecs'], this.access)
    },
    deleteAccessAll () {
      return hasOneOf(['assets.delete_ecs'], this.access)
    }
  },
  methods: {
    search () {
      console.log(this.hostname_search)
      this.get_ecs_list(`hostname=${this.hostname_search}`)
    },
    clear_search () {
      this.hostname_search = ''
      this.get_ecs_list()
    },
    get_ecs_list (parameter) {
      getEcsList(parameter).then(res => {
        this.data = res.data.results
        this.count = res.data.count
        console.log(this.data)
      }).catch(err => {
        this.$Message.error(`获取ecs信息错误 ${err}`)
      })
    },
    get_ecs_parameter (parameter) {
      console.log(parameter)
      this.get_ecs_list(`page=${parameter}`)
    },
    show (index) {
      this.$Modal.info({
        title: 'Ecs 信息',
        content: `主机名:${this.data[index].hostname}<br>创建时间:${this.data[index].c_time}<br>更新时间:${this.data[index].u_time}`
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        console.log()
        if (valid) {
          if (!this.updateId) {
            createEcs(this.formData).then(res => {
              console.log(res)
              this.$Message.success('创建ecs 成功!')
              this.get_ecs_list()
              this.create = false
            }).catch(err => {
              console.log(err.response)
              this.$Message.error({
                content: `创建ecs 错误 ${Object.entries(err.response.data)}`,
                duration: 10,
                closable: true
              })
            })
          } else {
            console.log(this.updateId)
            updateEcs(this.updateId, this.formData).then(res => {
              console.log(res)
              this.$Message.success('更新 ecs 成功!')
              this.get_ecs_list()
              this.create = false
            }).catch(err => {
              console.log(err.response)
              this.$Message.error({
                content: `更新 ecs 错误 ${Object.entries(err.response.data)}`,
                duration: 10,
                closable: true
              })
            })
          }
        } else {
          this.$Message.error('错误!')
        }
      })
    },
    add () {
      this.updateId = null
      this.formData.hostname = ''
      this.formData.type = '阿里云'
      this.formData.instance_id = ''
      this.formData.instance_name = ''
      this.formData.os_name = ''
      this.formData.cpu = 1
      this.formData.memory = 1
      this.formData.private_ip = null
      this.formData.public_ip = null
      this.create = true
    },
    remove (index, id) {
      console.log(index, id)
      deleteEcs(id).then(res => {
        console.log(res)
        this.$Message.success('删除 ecs 成功!')
        this.data.splice(index, 1)
      }).catch(err => {
        console.log(err.response)
        this.$Message.error({
          content: `删除 ecs 错误 ${Object.entries(err.response.data)}`,
          duration: 10,
          closable: true
        })
      })
    },
    update (index) {
      this.create = true
      this.formData.hostname = this.data[index].hostname
      this.formData.instance_id = this.data[index].instance_id
      this.formData.type = this.data[index].type
      this.formData.instance_name = this.data[index].instance_name
      this.formData.os_name = this.data[index].os_name
      this.formData.cpu = this.data[index].cpu
      this.formData.memory = this.data[index].memory
      this.formData.private_ip = this.data[index].private_ip
      this.formData.public_ip = this.data[index].public_ip
      this.updateId = this.data[index].id
    }
  }
}
</script>
<style>
.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
