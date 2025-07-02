import React from 'react'
import { Tabs, useRouter } from 'expo-router'
import UserIcon from '../components/Icon/UserIcon'
import HomeIcon from '../components/Icon/HomeIcon'
import DiaryCreationIcon from '../components/Icon/DiaryCreationIcon'

export default function TabLayout() {

  const router = useRouter();

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
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <DiaryCreationIcon size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            // デフォルトの画面遷移をキャンセル
            e.preventDefault();
            // パラメータを付けて自分で画面遷移を命令する
            router.push({
              pathname: '/diaryCreation',
              params: { isShowBackButton: 'false' }
            });
          },
        }}
      />
      <Tabs.Screen
        name="myPage"
        options={{
          title: "マイページ",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <UserIcon size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
