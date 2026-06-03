<template>
  <div>
    <el-button type="primary" @click="handleCreate" style="margin-bottom: 16px">新增帖子</el-button>

    <el-table :data="tableData" border stripe>
      <el-table-column label="图片">
        <template #default="{ row }">
          <el-image :src="row.images?.[0]" style="width: 80px; height: 80px" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" show-overflow-tooltip />
      <el-table-column label="商家" width="150">
        <template #default="{ row }">{{ row.merchant?.name || '-' }}</template>
      </el-table-column>
      <el-table-column label="发布时间" width="180">
        <template #default="{ row }">{{ row.createdAt }}</template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top: 16px; justify-content: flex-end"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="total"
      :page-sizes="[10, 20, 50]"
      layout="total, sizes, prev, pager, next"
      @current-change="loadData"
      @size-change="loadData"
    />

    <el-dialog v-model="dialogVisible" :title="isEditing ? '编辑帖子' : '新增帖子'" width="500px">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="图片URL">
          <el-input v-model="formData.imageUrl" placeholder="输入图片链接" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="formData.content" type="textarea" :rows="4" />
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
import { getPostList, createPost, updatePost, removePost } from '../../api/post'

const tableData = ref<any[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)
const dialogVisible = ref(false)
const isEditing = ref(false)
const formData = ref<any>({ imageUrl: '', content: '', merchantId: '' })

const loadData = async () => {
  const res = await getPostList({ page: currentPage.value, limit: pageSize.value }) as any
  tableData.value = res
  if (res.length < pageSize.value) {
    total.value = (currentPage.value - 1) * pageSize.value + res.length
  }
}

const handleCreate = () => {
  isEditing.value = false
  formData.value = { imageUrl: '', content: '', merchantId: '' }
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  isEditing.value = true
  formData.value = { ...row, imageUrl: row.images?.[0] || '' }
  dialogVisible.value = true
}

const handleSubmit = async () => {
  const { imageUrl, ...rest } = formData.value
  const submitData: any = { ...rest, images: [imageUrl] }
  delete submitData.merchant
  delete submitData.createdAt
  delete submitData.updatedAt
  if (isEditing.value) {
    await updatePost(submitData.id, submitData)
    ElMessage.success('修改成功')
  } else {
    await createPost(submitData)
    ElMessage.success('新增成功')
  }
  dialogVisible.value = false
  loadData()
}

const handleDelete = async (id: string) => {
  await ElMessageBox.confirm('确认删除该帖子？', '提示', { type: 'warning' })
  await removePost(id)
  ElMessage.success('删除成功')
  loadData()
}

onMounted(loadData)
</script>
