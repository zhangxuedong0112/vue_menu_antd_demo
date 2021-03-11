<script>
// import wangEditor from "../wangEditor/index.vue"
import quillSam from "../quillSam/index.vue"

let isPad = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

console.log("@@@@@@@@", isPad, navigator.userAgent)
// export default isPad ? quillSam : wangEditor;
export default quillSam;

</script>