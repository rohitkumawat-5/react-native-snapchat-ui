import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// ---- Mock Data ----
const CHATS = [
  { id: 'c1', name: 'Ananya', avatar: 'https://picsum.photos/seed/ananya-snap/120', status: 'received', snapType: 'Snap', time: '2m', streak: 45, unread: true },
  { id: 'c2', name: 'Rahul Verma', avatar: 'https://picsum.photos/seed/rahul-snap/120', status: 'opened', snapType: 'Chat', time: '18m', streak: 0, unread: false },
  { id: 'c3', name: 'Squad 🔥', avatar: 'https://picsum.photos/seed/group-snap/120', status: 'sent', snapType: 'Delivered', time: '1h', streak: 0, unread: false, isGroup: true },
  { id: 'c4', name: 'Meera Iyer', avatar: 'https://picsum.photos/seed/meera-snap/120', status: 'received', snapType: 'Snap', time: '3h', streak: 128, unread: true },
  { id: 'c5', name: 'Vikram', avatar: 'https://picsum.photos/seed/vikram-snap/120', status: 'opened', snapType: 'Opened', time: '1d', streak: 12, unread: false },
];

const MY_STORY = { avatar: 'https://picsum.photos/seed/me-snap/150' };

const FRIEND_STORIES = [
  { id: 's1', name: 'Ananya', avatar: 'https://picsum.photos/seed/ananya-snap/150', viewed: false },
  { id: 's2', name: 'Priya', avatar: 'https://picsum.photos/seed/priya-snap/150', viewed: false },
  { id: 's3', name: 'Rahul', avatar: 'https://picsum.photos/seed/rahul-snap/150', viewed: true },
  { id: 's4', name: 'Meera', avatar: 'https://picsum.photos/seed/meera-snap/150', viewed: false },
  { id: 's5', name: 'Vikram', avatar: 'https://picsum.photos/seed/vikram-snap/150', viewed: true },
];

const DISCOVER_ITEMS = [
  { id: 'd1', title: 'Weekend Vibes Only', publisher: 'Trending', image: 'https://picsum.photos/seed/discover1/300/450' },
  { id: 'd2', title: 'Top 10 Travel Spots', publisher: 'Wanderlust', image: 'https://picsum.photos/seed/discover2/300/450' },
  { id: 'd3', title: 'Daily Comic Strip', publisher: 'FunnyBones', image: 'https://picsum.photos/seed/discover3/300/450' },
  { id: 'd4', title: 'Match Highlights', publisher: 'SportsCenter', image: 'https://picsum.photos/seed/discover4/300/450' },
];

const LENSES = [
  { id: 'l1', emoji: '😎' },
  { id: 'l2', emoji: '🐶' },
  { id: 'l3', emoji: '✨' },
  { id: 'l4', emoji: '🌈' },
  { id: 'l5', emoji: '👽' },
  { id: 'l6', emoji: '🎭' },
];

const COLORS = {
  yellow: '#FFFC00',
  black: '#0A0A0A',
  dark: '#151515',
  white: '#FFFFFF',
  text: '#111111',
  subtext: '#8A8A8A',
  border: '#EDEDED',
  blue: '#0FADFF',
  red: '#FF3B30',
  purple: '#9C4DFF',
};

function statusIcon(status) {
  if (status === 'received') return { symbol: '▶', color: COLORS.red };
  if (status === 'sent') return { symbol: '▶', color: COLORS.blue };
  return { symbol: '▷', color: COLORS.subtext };
}

// ================= CHAT VIEW =================

function ChatHeader() {
  return (
    <View style={styles.chatHeader}>
      <TouchableOpacity style={styles.myAvatarBtn}>
        <Image source={{ uri: MY_STORY.avatar }} style={styles.myAvatarSmall} />
      </TouchableOpacity>
      <View style={styles.chatSearchWrap}>
        <Text style={styles.chatSearchIcon}>⌕</Text>
        <Text style={styles.chatSearchPlaceholder}>Search</Text>
      </View>
      <TouchableOpacity style={styles.addFriendBtn}>
        <Text style={styles.addFriendIcon}>➕</Text>
      </TouchableOpacity>
    </View>
  );
}

function ChatRow({ chat }) {
  const icon = statusIcon(chat.status);
  return (
    <TouchableOpacity style={styles.chatRow} activeOpacity={0.8}>
      <Image source={{ uri: chat.avatar }} style={styles.chatAvatar} />
      <View style={{ flex: 1 }}>
        <Text style={[styles.chatName, chat.unread && styles.chatNameUnread]} numberOfLines={1}>
          {chat.name}
        </Text>
        <View style={styles.chatStatusRow}>
          <Text style={[styles.chatStatusIcon, { color: icon.color }]}>{icon.symbol}</Text>
          <Text style={[styles.chatStatusText, chat.unread && styles.chatStatusTextUnread]}>
            {chat.snapType} · {chat.time}
          </Text>
          {chat.streak > 0 && (
            <Text style={styles.streakText}>🔥{chat.streak}</Text>
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.chatCameraBtn}>
        <Text style={styles.chatCameraIcon}>📷</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

function ChatListView() {
  return (
    <SafeAreaView style={styles.chatRoot}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <ChatHeader />
      <FlatList
        data={CHATS}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <ChatRow chat={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

// ================= CAMERA VIEW =================

function CameraView({ onOpenChat, onOpenStories }) {
  return (
    <View style={styles.cameraRoot}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />

      {/* faux camera viewfinder */}
      <Image
        source={{ uri: 'https://picsum.photos/seed/camera-feed/800/1400' }}
        style={styles.cameraFeed}
      />
      <View style={styles.cameraScrim} />

      <SafeAreaView style={styles.cameraOverlay}>
        <View style={styles.cameraTopRow}>
          <TouchableOpacity style={styles.myAvatarChip}>
            <Image source={{ uri: MY_STORY.avatar }} style={styles.myAvatarChipImg} />
            <Text style={styles.snapScore}>52.4k</Text>
          </TouchableOpacity>

          <View style={styles.cameraTopRightIcons}>
            <TouchableOpacity style={styles.iconCircle}>
              <Text style={styles.iconGlyph}>⚡</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle}>
              <Text style={styles.iconGlyph}>⚙</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1 }} />

        {/* lens carousel */}
        <FlatList
          data={LENSES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(i) => i.id}
          contentContainerStyle={styles.lensRow}
          renderItem={({ item, index }) => (
            <View style={[styles.lensCircle, index === 2 && styles.lensCircleActive]}>
              <Text style={styles.lensEmoji}>{item.emoji}</Text>
            </View>
          )}
        />

        {/* bottom capture row */}
        <View style={styles.captureRow}>
          <TouchableOpacity style={styles.sideNavBtn} onPress={onOpenChat} activeOpacity={0.8}>
            <View style={styles.chatBubbleIcon}>
              <Text style={styles.chatBubbleText}>💬</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.captureBtnOuter} activeOpacity={0.85}>
            <View style={styles.captureBtnInner} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sideNavBtn} onPress={onOpenStories} activeOpacity={0.8}>
            <View style={styles.storiesIconWrap}>
              <Text style={styles.storiesIconText}>▦</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.swipeHintRow}>
          <Text style={styles.swipeHintText}>← </Text>
          <View style={styles.swipeDotActive} />
          <Text style={styles.swipeHintText}>Stories →</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

// ================= STORIES / DISCOVER VIEW =================

function StoryCircle({ item }) {
  return (
    <TouchableOpacity style={styles.storyItem} activeOpacity={0.8}>
      <View style={[styles.storyRing, item.viewed && styles.storyRingViewed]}>
        <Image source={{ uri: item.avatar }} style={styles.storyAvatar} />
      </View>
      <Text style={styles.storyName} numberOfLines={1}>{item.name}</Text>
    </TouchableOpacity>
  );
}

function DiscoverCard({ item }) {
  return (
    <TouchableOpacity style={styles.discoverCard} activeOpacity={0.85}>
      <Image source={{ uri: item.image }} style={styles.discoverImage} />
      <View style={styles.discoverOverlay}>
        <Text style={styles.discoverPublisher}>{item.publisher}</Text>
        <Text style={styles.discoverTitle} numberOfLines={2}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

function StoriesView() {
  return (
    <SafeAreaView style={styles.storiesRoot}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
      <View style={styles.storiesHeader}>
        <Text style={styles.storiesHeaderTitle}>Stories</Text>
        <Text style={styles.storiesSearchIcon}>⌕</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.myStoryRow}>
          <View style={styles.storyRing}>
            <Image source={{ uri: MY_STORY.avatar }} style={styles.storyAvatar} />
            <View style={styles.addStoryPlus}>
              <Text style={styles.addStoryPlusText}>+</Text>
            </View>
          </View>
          <View>
            <Text style={styles.myStoryTitle}>My Story</Text>
            <Text style={styles.myStorySub}>Tap to add to your story</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>FRIENDS</Text>
        <FlatList
          data={FRIEND_STORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 14 }}
          renderItem={({ item }) => <StoryCircle item={item} />}
        />

        <Text style={[styles.sectionLabel, { marginTop: 22 }]}>DISCOVER</Text>
        <View style={styles.discoverGrid}>
          {DISCOVER_ITEMS.map((item) => (
            <DiscoverCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ================= MAIN (swipe between the 3 views) =================

export default function SnapchatHomeScreen() {
  const [view, setView] = useState('camera'); // 'chat' | 'camera' | 'stories'

  if (view === 'chat') {
    return (
      <View style={{ flex: 1 }}>
        <ChatListView />
        <TouchableOpacity style={styles.floatingBackToCamera} onPress={() => setView('camera')} activeOpacity={0.85}>
          <Text style={styles.floatingBackIcon}>📷</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (view === 'stories') {
    return (
      <View style={{ flex: 1 }}>
        <StoriesView />
        <TouchableOpacity style={styles.floatingBackToCamera} onPress={() => setView('camera')} activeOpacity={0.85}>
          <Text style={styles.floatingBackIcon}>📷</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <CameraView onOpenChat={() => setView('chat')} onOpenStories={() => setView('stories')} />;
}

// ================= Styles =================

const styles = StyleSheet.create({
  // ---- Chat view ----
  chatRoot: { flex: 1, backgroundColor: COLORS.white },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  myAvatarBtn: { padding: 2 },
  myAvatarSmall: { width: 34, height: 34, borderRadius: 17 },
  chatSearchWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.border,
    borderRadius: 18,
    height: 36,
    paddingHorizontal: 12,
    gap: 6,
  },
  chatSearchIcon: { fontSize: 14, color: COLORS.subtext },
  chatSearchPlaceholder: { fontSize: 13, color: COLORS.subtext },
  addFriendBtn: { padding: 6 },
  addFriendIcon: { fontSize: 18 },

  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  chatAvatar: { width: 48, height: 48, borderRadius: 24 },
  chatName: { fontSize: 14.5, fontWeight: '600', color: COLORS.text },
  chatNameUnread: { fontWeight: '900' },
  chatStatusRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  chatStatusIcon: { fontSize: 11 },
  chatStatusText: { fontSize: 12, color: COLORS.subtext, fontWeight: '500' },
  chatStatusTextUnread: { color: COLORS.text, fontWeight: '800' },
  streakText: { fontSize: 11, color: COLORS.subtext, marginLeft: 4 },
  chatCameraBtn: { padding: 6 },
  chatCameraIcon: { fontSize: 20 },

  // ---- Camera view ----
  cameraRoot: { flex: 1, backgroundColor: COLORS.black },
  cameraFeed: { ...StyleSheet.absoluteFillObject, resizeMode: 'cover' },
  cameraScrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.15)' },
  cameraOverlay: { flex: 1, justifyContent: 'flex-start' },

  cameraTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  myAvatarChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 20,
    paddingRight: 12,
    gap: 8,
  },
  myAvatarChipImg: { width: 34, height: 34, borderRadius: 17, borderWidth: 2, borderColor: COLORS.yellow },
  snapScore: { color: '#fff', fontSize: 12, fontWeight: '800' },
  cameraTopRightIcons: { flexDirection: 'row', gap: 10 },
  iconCircle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center', justifyContent: 'center',
  },
  iconGlyph: { fontSize: 16, color: '#fff' },

  lensRow: { paddingHorizontal: 16, gap: 10, paddingBottom: 14, alignItems: 'center' },
  lensCircle: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'transparent',
  },
  lensCircleActive: { borderColor: COLORS.yellow, backgroundColor: 'rgba(255,255,255,0.25)' },
  lensEmoji: { fontSize: 24 },

  captureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingBottom: 10,
  },
  sideNavBtn: { width: 48, alignItems: 'center' },
  chatBubbleIcon: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center', justifyContent: 'center',
  },
  chatBubbleText: { fontSize: 20 },
  storiesIconWrap: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center', justifyContent: 'center',
  },
  storiesIconText: { fontSize: 18, color: '#fff' },

  captureBtnOuter: {
    width: 78, height: 78, borderRadius: 39,
    borderWidth: 4, borderColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  captureBtnInner: { width: 62, height: 62, borderRadius: 31, backgroundColor: '#fff' },

  swipeHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingBottom: 16,
  },
  swipeHintText: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '600' },
  swipeDotActive: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: COLORS.yellow },

  // ---- Stories view ----
  storiesRoot: { flex: 1, backgroundColor: COLORS.black },
  storiesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  storiesHeaderTitle: { color: '#fff', fontSize: 20, fontWeight: '900' },
  storiesSearchIcon: { color: '#fff', fontSize: 18 },

  myStoryRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, marginTop: 6, marginBottom: 20 },
  myStoryTitle: { color: '#fff', fontSize: 14.5, fontWeight: '800' },
  myStorySub: { color: 'rgba(255,255,255,0.5)', fontSize: 11.5, marginTop: 2 },
  addStoryPlus: {
    position: 'absolute',
    bottom: -2, right: -2,
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: COLORS.blue,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: COLORS.black,
  },
  addStoryPlusText: { color: '#fff', fontSize: 12, fontWeight: '900', marginTop: -1 },

  sectionLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  storyItem: { width: 68, alignItems: 'center' },
  storyRing: {
    width: 60, height: 60, borderRadius: 30,
    borderWidth: 2.5, borderColor: COLORS.purple,
    alignItems: 'center', justifyContent: 'center',
    padding: 2,
  },
  storyRingViewed: { borderColor: 'rgba(255,255,255,0.25)' },
  storyAvatar: { width: '100%', height: '100%', borderRadius: 27 },
  storyName: { color: '#fff', fontSize: 11, marginTop: 6, textAlign: 'center' },

  discoverGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    rowGap: 12,
  },
  discoverCard: {
    width: (width - 32 - 12) / 2,
    height: 210,
    borderRadius: 14,
    overflow: 'hidden',
  },
  discoverImage: { width: '100%', height: '100%', backgroundColor: COLORS.dark },
  discoverOverlay: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  discoverPublisher: { color: COLORS.yellow, fontSize: 9.5, fontWeight: '800', letterSpacing: 0.4 },
  discoverTitle: { color: '#fff', fontSize: 12.5, fontWeight: '700', marginTop: 3 },

  // ---- Floating back-to-camera button (shown on Chat/Stories views) ----
  floatingBackToCamera: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: COLORS.yellow,
    alignItems: 'center', justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  floatingBackIcon: { fontSize: 22 },
});
