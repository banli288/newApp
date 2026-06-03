<template>
  <div>
    <el-button type="primary" @click="handleCreate" style="margin-bottom: 16px">新增轮播图</el-button>

    <el-table :data="tableData" border stripe>
      <el-table-column label="图片">
        <template #default="{ row }">
          <el-image :src="row.image" style="width: 120px; height: 60px" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column prop="link" label="跳转链接" />
      <el-table-column prop="sortOrder" label="排序" width="80" />
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEditing ? '编辑轮播图' : '新增轮播图'" width="450px">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="图片URL">
          <el-input v-model="formData.image" />
        </el-form-item>
        <el-form-item label="跳转链接">
          <el-input v-model="formData.link" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="formData.sortOrder" :min="0" />
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
import { getCarouselList, createCarousel, updateCarousel, removeCarousel } from '../../api/carousel'

const tableData = ref<any[]>([])
const dialogVisible = ref(false)
const isEditing = ref(false)
const formData = ref<any>({ image: '', link: '', sortOrder: 0 })

const loadData = async () => {
  tableData.value = (await getCarouselList()) as any
}

const handleCreate = () => {
  isEditing.value = false
  formData.value = { image: '', link: '', sortOrder: 0 }
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  isEditing.value = true
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleSubmit = async () => {
  const { id, createdAt, updatedAt, ...data } = formData.value
  if (isEditing.value) {
    await updateCarousel(formData.value.id, data)
    ElMessage.success('修改成功')
  } else {
    await createCarousel(data)
    ElMessage.success('新增成功')
  }
  dialogVisible.value = false
  loadData()
}

const handleDelete = async (id: string) => {
  await ElMessageBox.confirm('确认删除该轮播图？', '提示', { type: 'warning' })
  await removeCarousel(id)
  ElMessage.success('删除成功')
  loadData()
}

onMounted(loadData)
</script>
