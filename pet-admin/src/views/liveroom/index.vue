<template>
  <div>
    <el-button type="primary" @click="handleCreate" style="margin-bottom: 16px">新增直播间</el-button>

    <el-table :data="tableData" border stripe>
      <el-table-column label="封面">
        <template #default="{ row }">
          <el-image :src="row.coverImage" style="width: 100px; height: 60px" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" />
      <el-table-column label="商家" width="150">
        <template #default="{ row }">{{ row.merchant?.name || '-' }}</template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEditing ? '编辑直播间' : '新增直播间'" width="450px">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="封面URL">
          <el-input v-model="formData.coverImage" />
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="formData.title" />
        </el-form-item>
        <el-form-item label="商家ID">
          <el-input v-model="formData.merchantId" placeholder="手动输入商家ID" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getLiveRoomList, createLiveRoom, updateLiveRoom, removeLiveRoom } from '../../api/liveroom'

const tableData = ref<any[]>([])
const dialogVisible = ref(false)
const isEditing = ref(false)
const formData = ref<any>({ coverImage: '', title: '', merchantId: '' })

const loadData = async () => {
  tableData.value = (await getLiveRoomList()) as any
}

const handleCreate = () => {
  isEditing.value = false
  formData.value = { coverImage: '', title: '', merchantId: '' }
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  isEditing.value = true
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleSubmit = async () => {
  const { id, createdAt, updatedAt, merchant, ...data } = formData.value
  if (isEditing.value) {
    await updateLiveRoom(formData.value.id, data)
    ElMessage.success('修改成功')
  } else {
    await createLiveRoom(data)
    ElMessage.success('新增成功')
  }
  dialogVisible.value = false
  loadData()
}

const handleDelete = async (id: string) => {
  await ElMessageBox.confirm('确认删除该直播间？', '提示', { type: 'warning' })
  await removeLiveRoom(id)
  ElMessage.success('删除成功')
  loadData()
}

onMounted(loadData)
</script>
