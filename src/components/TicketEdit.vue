<script setup>
  import { ref } from 'vue';
  import SafeEditor from './SafeEditor.vue'; // パスは実際の場所に合わせる

  // チケットのデータ
  const ticket = ref({
    id: 101,
    title: 'ログイン画面でエラーが出る',
    description:
      'ユーザーIDを入力してエンターを押すと、500エラーが返ってきます。\n再現手順:\n1. ログイン画面を開く\n2. ID入力...',
  });

  // タイトル保存時の処理（APIなどを呼ぶ場所）
  const onSaveTitle = async (newValue) => {
    console.log('タイトルを保存中...', newValue);
    // await api.updateTicket(ticket.value.id, { title: newValue })
    // 成功したらトースト通知などを出す
  };

  // 詳細保存時の処理
  const onSaveDescription = async (newValue) => {
    console.log('詳細を保存中...', newValue);
    // await api.updateTicket(ticket.value.id, { description: newValue })
  };
</script>

<template>
  <v-container>
    <v-card
      class="pa-5"
      max-width="800"
    >
      <h2 class="mb-4">チケット詳細</h2>

      <!-- タイトル部分 -->
      <div class="mb-6">
        <label class="text-subtitle-2 text-grey">タイトル</label>
        <!-- ここで SafeEditor を使います -->
        <SafeEditor
          v-model="ticket.title"
          @save="onSaveTitle"
        />
      </div>

      <!-- 詳細文部分 -->
      <div class="mb-6">
        <label class="text-subtitle-2 text-grey">詳細内容</label>
        <!-- 詳細文用（行数を多くしたい場合などはpropsを足すと良いですが、今回は自動調整） -->
        <SafeEditor
          v-model="ticket.description"
          @save="onSaveDescription"
        />
      </div>

      <v-divider class="my-4"></v-divider>

      <!-- デバッグ用：実際のデータが変わっているか確認 -->
      <pre class="bg-grey-lighten-4 pa-2">現在のデータ: {{ ticket }}</pre>
    </v-card>
  </v-container>
</template>
