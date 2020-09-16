<template>
    <div>
        <div class="title">
            <h2>Amplifyで作るチャットアプリ</h2>
        </div>
        <div class="main-contents">
            <div class="message_base">
                <div v-for="message in messages" :key="message.id">
                    <div
                            v-bind:class="[message.username === userName ? 'message' : 'message_opponent']"
                    >
                        {{message.content}}
                    </div>
                    <div
                            v-bind:class="[message.username === userName ? 'username' : 'username_opponent']"
                    >
                        {{message.username}}
                    </div>
                </div>
            </div>
            <el-input
                    placeholder="メッセージを入力(Enterで送信)"
                    v-model="content"
                    @keydown.enter.native="sendMessage"
            ></el-input>
            <div class="error">{{ this.error }}</div>
        </div>
    </div>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import API, {graphqlOperation} from '@aws-amplify/api';
    import {Auth} from 'aws-amplify';
    // eslint-disable-next-line no-unused-vars
    import {createMessage} from './graphql/mutations';
    // eslint-disable-next-line no-unused-vars
    import {listMessages} from './graphql/queries';
    // eslint-disable-next-line no-unused-vars
    import {onCreateMessage} from './graphql/subscriptions';

    window.LOG_LEVEL = 'VERBOSE';
    export default {
        name: 'chat',
        data() {
            return {
                messages: [],
                content: '',
                userName: '',
                subscription: {},
                error: ''
            };
        },
        methods: {
            // TODO(1) GraphQLエンドポイントにMutationを発行し、メッセージを登録する
            sendMessage() {
                if (event.keyCode !== 13) return // Enterキーの場合のみ送信処理を行う
                const message = {
                    id: new Date().getTime() + this.userName,
                    username: this.userName,
                    content: this.content
                }
                // Mutationの実行
                API.graphql(graphqlOperation(createMessage, {input: message}))
                    .catch(error => this.error = JSON.stringify(error))
                this.content = ""
            },
            // TODO(2) GraphQLエンドポイントにqueryを発行し、メッセージ一覧を取得する
            fetch() {
                API.graphql(graphqlOperation(listMessages, {limit: 100}))
                    .then(messages => this.messages = messages.data.listMessages.items.sort((a, b) => a.id > b.id ? 1 : -1))
                    .catch(error => this.error = JSON.stringify(error))
            },
            // TODO(3-1) GraphQLエンドポイントにSubscriptionを発行し、mutationを監視する
            subscribe() {
                this.subscription = API.graphql(graphqlOperation(onCreateMessage)).subscribe({
                    next: (eventData) => {
                        const message = eventData.value.data.onCreateMessage;
                        this.messages.push(message);
                    }
                })
            },
            scrollBottom() {
                const container = this.$el.querySelector('.message_base');
                container.scrollTop = container.scrollHeight;
            }
        },
        async created() {
            this.userName = (await Auth.currentAuthenticatedUser()).username;
            this.fetch();
            this.subscribe();
        },
        // TODO(3-2) チャット画面から離れる際に、UnSubscribeする
        beforeDestroy() {
           this.subscription.unsubscribe();
        },
        updated: function () {
            this.scrollBottom();
        }
    };
</script>

<style scoped>
    .title {
        float: left;
    }

    .main-contents {
        float: left;
        width: 100%;
    }

    .message_base {
        overflow: auto;
        max-height: 500px;
        border-right: 1px solid #ddd;
        border-left: 1px solid #ddd;
        background-color: #eee;
        box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2) inset;
    }

    .message {
        width: 30%;
        margin: 10px 10px 10px auto;
        padding: 20px;
        background-color: #7ade40;
        border-radius: 10px;
        word-wrap: break-word;
    }

    .message_opponent {
        width: 30%;
        margin: 10px;
        padding: 20px;
        background-color: #f8f8f8;
        border-radius: 10px;
        word-wrap: break-word;
    }

    .username {
        text-align: right;
        margin: -12px 10px 0px 0px;
        font-size: 14px;
    }

    .username_opponent {
        text-align: left;
        margin: -12px 0px 0px 10px;
        font-size: 14px;
    }

    .error {
        color: red;
    }
</style>