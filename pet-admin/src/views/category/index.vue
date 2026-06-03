<template>
  <div>
    <el-button type="primary" @click="handleCreate" style="margin-bottom: 16px">新增分类</el-button>

    <el-table :data="tableData" border stripe row-key="id" default-expand-all>
      <el-table-column prop="name" label="分类名称" />
      <el-table-column label="图标" width="100">
        <template #default="{ row }">
          <el-image v-if="row.icon" :src="row.icon" style="width: 40px; height: 40px" fit="cover" />
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="280" />
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEditing ? '编辑分类' : '新增分类'" width="450px">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="图标URL">
          <el-input v-model="formData.icon" placeholder="输入图标链接" />
        </el-form-item>
        <el-form-item label="父分类">
          <el-cascader
            v-model="formData.parentId"
            :options="tableData"
            :props="{ value: 'id', label: 'name', children: 'children', checkStrictly: true, emitPath: false }"
            placeholder="留空则为一级分类"
            clearable
            style="width: 100%"
          />
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
import { getCategoryTree, createCategory, updateCategory, removeCategory } from '../../api/category'

const tableData = ref<any[]>([])
const dialogVisible = ref(false)
const isEditing = ref(false)
const formData = ref<any>({ name: '', icon: '', parentId: '' })

const loadData = async () => {
  tableData.value = (await getCategoryTree()) as any
}

const handleCreate = () => {
  isEditing.value = false
  formData.value = { name: '', icon: '', parentId: '' }
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  isEditing.value = true
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleSubmit = async () => {
  const data: any = { name: formData.value.name, icon: formData.value.icon, parentId: formData.value.parentId || undefined }
  if (isEditing.value) {
    await updateCategory(formData.value.id, data)
    ElMessage.success('修改成功')
  } else {
    await createCategory(data)
    ElMessage.success('新增成功')
  }
  dialogVisible.value = false
  loadData()
}

const handleDelete = async (id: string) => {
  await ElMessageBox.confirm('确认删除该分类？', '提示', { type: 'warning' })
  await removeCategory(id)
  ElMessage.success('删除成功')
  loadData()
}

onMounted(loadData)
</script>
