import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { useAuthStore } from './useAuthStore'
export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const res = await axiosInstance.get('/messages/users')
            set({ users: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUserLoading: false })
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true })
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({ messages: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get()
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
            set({ messages: [...messages, res.data] })

        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    //This is to load all messages to 'messages' array of this store
    subscribeToMessages: () => {
        if (!get().selectedUser) return;

        const socket = useAuthStore.getState().socket

        socket.on('newMessage', (newMessage) => {
            if (get().selectedUser._id === newMessage.senderId) {
                set({ messages: [...get().messages, newMessage] })
            }
        })
    },

    //This is to remove all messages from 'message' array of this store, after the user logsout or when the user changes the chat.
    unSubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off('newMessage')
    },

    setSelectedUser: (selectedUser) => set({ selectedUser })

}))