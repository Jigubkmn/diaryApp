import React from 'react'
import { Tabs } from 'expo-router'
import UserIcon from '../../components/UserIcon'
import HomeIcon from '../../components/HomeIcon'
import DiaryCreationIcon from '../../components/DiaryCreationIcon'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFA500', // アクティブなタブの色（オレンジ）
        tabBarInactiveTintColor: '#8E8E93', // 非アクティブなタブの色
        tabBarStyle: {
          backgroundColor: '#FFFFFF', // タブバーの背景色
          borderTopWidth: 1, // タブバーの境界線の幅
          borderTopColor: '#E5E5EA', // タブバーの境界線の色
        },
        headerStyle: {
          backgroundColor: '#FFFFFF', // ヘッダーの背景色
        },
        headerTitleStyle: {
          fontWeight: 'bold', // ヘッダーのタイトルのフォントの太さ
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "日記一覧",
          tabBarIcon: ({ color, size }) => (
            <HomeIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="diaryCreation"
        options={{
          title: "日記作成",
          tabBarIcon: ({ color, size }) => (
            <DiaryCreationIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "ユーザー",
          tabBarIcon: ({ color, size }) => (
            <UserIcon size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
