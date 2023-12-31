import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import TopicHelper from "./topicHelper";
import { TopicThunks } from "./topicThunks";
import { TopicState, TreeItem } from "./types";
import { DetailTopic } from "@services/topic/types";


const initialState: TopicState = {
    topics: [],
    loading: false,

    tree: [],
    treeLoading: false,

    topic: null,
    topicLoading: false,
    editLoading: false,
}

export const topic = createSlice({
    name: 'topic',
    initialState: initialState,
    reducers: {
        setOpenTree(state, action: PayloadAction<{ open: boolean, id: string }>) {
            const index = state.tree.findIndex(item => item.root.id === action.payload.id);
            if (index !== -1) state.tree[index] = { ...state.tree[index], open: action.payload.open };
        },
        setTopic(state, action: PayloadAction<DetailTopic | null>) {
            state.topic = action.payload
        },

        dragItem(state, action: PayloadAction<{ id: string, transfer: string }>) {
            const a = state.tree.findIndex(item => item.root.id === action.payload.id);
            const b = state.tree.findIndex(item => item.root.id === action.payload.transfer);
            state.tree[b].root.parent = state.tree[a].root.id
            state.tree[a] = {
                ...state.tree[a],
                open: true,
                children: [action.payload.transfer]
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(TopicThunks.create.fulfilled, (state, action) => {
                TopicHelper.updateWhenCreate(state.tree, state.topics, action.payload);
                state.loading = false;
                state.topicLoading = false;
                state.treeLoading = false;
            });

        builder
            .addCase(TopicThunks.update.pending, (state, action) => {
                state.editLoading = true;
            })
            .addCase(TopicThunks.update.fulfilled, (state, action) => {
                const index = state.tree.findIndex(item => item.root.id === action.payload.id);
                state.tree[index] = {
                    ...state.tree[index],
                    root: TopicHelper.convertDetailTopicToFolder({ ...state.tree[index]?.root, ...action.payload }),
                }
                const indexTopic = state.topics.findIndex(topic => topic.id === action.payload.id);
                state.topics[indexTopic] = { ...topic, ...TopicHelper.convertDetailTopicToTopic(action.payload) }

                state.topic = {
                    ...state.topic,
                    ...action.payload,
                }
                state.editLoading = false;
            });

        builder
            .addCase(TopicThunks.delete.fulfilled, (state, action) => {
                TopicHelper.updateWhenDelete(state.tree, state.topics, action.meta.arg);
                state.treeLoading = false;
                state.loading = false;
            });

        builder
            .addCase(TopicThunks.getAll.fulfilled, (state, action) => {
                state.topics = action.payload;
                state.loading = false;
            });

        builder
            .addCase(TopicThunks.getByStatus.fulfilled, (state, action) => {
                state.topics = action.payload;
                state.loading = false;
            });

        builder
            .addCase(TopicThunks.getByConditions.fulfilled, (state, action) => {
                state.topics = action.payload;
                state.loading = false;
            });

        builder
            .addCase(TopicThunks.getByParent.fulfilled, (state, action) => {
                const id = action.meta.arg;
                const index = state.tree.findIndex(_item => _item.root.id === id);
                const ids = action.payload.map(item => {
                    const has = state.tree.findIndex(_item => _item.root.id === item.id);
                    if (index !== -1 && has === -1) state.tree.push({ root: item, children: [], open: false });
                    return item.id
                });
                state.tree[index] = { ...state.tree[index], children: ids }
                state.loading = false;
                state.treeLoading = false;
            });

        builder
            .addCase(TopicThunks.getByRoot.fulfilled, (state, action) => {
                state.tree = action.payload.map(topic => ({ root: topic, children: [], open: false }))
                state.loading = false;
                state.treeLoading = false;
            })

        builder
            .addCase(TopicThunks.getById.pending, (state, action) => {
                // state.topic = null;
                state.topicLoading = true;
            })
            .addCase(TopicThunks.getById.fulfilled, (state, action) => {
                state.topic = action.payload;
                state.topicLoading = false;
            });

        builder
            .addCase(TopicThunks.addComment.fulfilled, (state, action) => {
                if (!state.topic?.comments) return;
                state.topic.comments.push(action.payload)
            })
            .addCase(TopicThunks.editComment.fulfilled, (state, action) => {
                if (!state.topic?.comments) return;
                const index = state.topic.comments.findIndex(comment => comment.id === action.payload.id)
                state.topic.comments[index] = action.payload
            })
            .addCase(TopicThunks.deleteComment.fulfilled, (state, action) => {
                if (!state.topic?.comments) return;
                state.topic.comments = state.topic.comments.filter(comment => comment.id !== action.meta.arg.id)

            });
    }
})

export const TopicActions = topic.actions;