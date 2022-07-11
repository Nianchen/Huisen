<template>
   

  <quill-editor class="editor" v-model="content" ref="quillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
    @change="onEditorChange($event)"></quill-editor>
</template>

<script>
// 工具栏配置

import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  components: { quillEditor },
  data() {
    return {
      content: null,
      editorOption: {
        theme: "snow", // or 'bubble'
        placeholder: "请输入内容",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            // ["blockquote", "code-block"], // 引用  代码块
            // [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ align: [] }], // 对齐方式
            ["clean"],
          ],
        },
      },
    };
  },
  mounted() {
    this.clearContent()
  },
  methods: {
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    clearContent(){
      this.$bus.$on("clearContent", res => {
        this.content = res
      })
    },
    onEditorChange(e) {
      //内容改变事件
      console.log(e.html);
      this.content = e.html;
      this.$emit("getContent", this.content);
    },
  },
};
</script>

<style>
.editor {
  line-height: normal !important;
  height: 200px;
}
.ql-editor {
  color: aliceblue;
}
.ql-toolbar.ql-snow {
  border: 1px solid #014d90;
  background-color: aliceblue;
}
.ql-container.ql-snow {
  border: 1px solid #014d90;
  font-size: 15px;
  height: 8vh;
  /* overflow-y: scroll; */
}
</style>
