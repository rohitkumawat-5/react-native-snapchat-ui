import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  SafeAreaView,
} from 'react-native';

const COLORS = {
  bg: '#F3F2F0',
  white: '#FFFFFF',
  text: '#111111',
  subtext: '#7D7D7D',
  faintBg: '#E7E5E2',
  yellow: '#FFFC00',
  purple: '#8E4CFF',
  red: '#FF3B30',
  blue: '#12AFFF',
  dark: '#1B1B1B',
};

const FILTER_TABS = [
  { id: 'unread', label: 'Unread', count: 2, active: true },
  { id: 'my-ai', label: 'My AI', ai: true },
  { id: 'near-me', label: 'Near me' },
  { id: 'stories', label: 'Stories', count: 1 },
  { id: 'reply', label: 'Reply' },
];

const CHATS = [
  {
    id: 'c1',
    name: 'Radha',
    emoji: '💜',
    avatar: 'https://picsum.photos/seed/partner-snap/150',
    preview: '4 new Snaps',
    time: '14h',
    streak: 106,
    accent: 'purple',
    rightIcon: 'chat',
    isUnread: true,
  },
  {
    id: 'c2',
    name: 'QuickBite',
    label: 'Ad',
    avatar: 'https://picsum.photos/seed/quickbite-snap/150',
    preview: 'Try the new combo at ₹29.',
    accent: 'red',
    rightIcon: 'share',
    isAd: true,
  },
  {
    id: 'c3',
    name: 'Priya (Work)',
    avatar: 'https://picsum.photos/seed/priya-work-snap/150',
    preview: 'Double-tap to reply',
    accent: 'purple',
    rightIcon: 'camera',
    emojiBadge: '😊',
  },
  {
    id: 'c4',
    name: 'Akash (Work)',
    avatar: 'https://picsum.photos/seed/akash-work-snap/150',
    preview: 'Double-tap to reply',
    accent: 'none',
    rightIcon: 'camera',
    emojiBadge: '😊',
  },
  {
    id: 'c5',
    name: 'Rohit Kumawat',
    avatar: 'https://picsum.photos/seed/rohit-kumawat-snap/150',
    preview: 'Double-tap to reply',
    accent: 'none',
    rightIcon: 'camera',
  },
  {
    id: 'c6',
    name: 'Partner',
    avatar: 'https://picsum.photos/seed/partner-snap/150',
    preview: 'Double-tap to reply',
    accent: 'none',
    rightIcon: 'camera',
  },
  {
    id: 'c7',
    name: 'Shubham Kumawat',
    avatar: 'https://picsum.photos/seed/shubham-kumawat-snap/150',
    preview: 'Double-tap to reply',
    accent: 'none',
    rightIcon: 'camera',
  },
  {
    id: 'c8',
    name: 'Taniya Sharma',
    avatar: 'https://picsum.photos/seed/taniya-sharma-snap/150',
    preview: 'Double-tap to reply',
    accent: 'none',
    rightIcon: 'camera',
  },
  {
    id: 'c9',
    name: 'Rahu Singh',
    avatar: 'https://picsum.photos/seed/rahu-singh-snap/150',
    preview: 'Double-tap to reply',
    accent: 'none',
    rightIcon: 'camera',
  },
  {
    id: 'c10',
    name: 'Mahima Gupta',
    avatar: 'https://picsum.photos/seed/mahima-gupta-snap/150',
    preview: 'Double-tap to reply',
    accent: 'none',
    rightIcon: 'camera',
  },
];

function Header() {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity style={styles.profileBtn} activeOpacity={0.8}>
        <Image source={{ uri: 'https://picsum.photos/seed/me-snap-profile/150' }} style={styles.profileImg} />
      </TouchableOpacity>

      <Text style={styles.title}>Chat</Text>

      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.statusBtn} activeOpacity={0.8}>
          <Text style={styles.statusGlyph}>🔔</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
          <Text style={styles.addGlyph}>＋</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>5</Text></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.statusBtn} activeOpacity={0.8}>
          <Text style={styles.statusGlyph}>⚙</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function TabFilters() {
  return (
    <View style={styles.filterRow}>
      {FILTER_TABS.map((tab) => (
        <TouchableOpacity key={tab.id} style={styles.filterItem} activeOpacity={0.8}>
          {tab.ai && <Image source={{ uri: 'https://picsum.photos/seed/my-ai-pill/80' }} style={styles.aiPill} />}
          <Text style={[styles.filterText, tab.active && styles.filterTextActive]}>{tab.label}</Text>
          {tab.count != null && <View style={styles.filterCount}><Text style={styles.filterCountText}>{tab.count}</Text></View>}
        </TouchableOpacity>
      ))}
    </View>
  );
}

function RightAction({ type }) {
  if (type === 'chat') {
    return <Text style={styles.actionIcon}>💬</Text>;
  }
  if (type === 'camera') {
    return <View style={styles.cameraAction}><Text style={styles.cameraActionText}>◉</Text></View>;
  }
  if (type === 'share') {
    return <Text style={styles.actionIcon}>↗</Text>;
  }
  return null;
}

function ChatRow({ item }) {
  const isPurpleRing = item.accent === 'purple';

  return (
    <TouchableOpacity style={styles.chatRow} activeOpacity={0.82}>
      <View style={styles.avatarWrap}>
        <View style={[styles.avatarShell, isPurpleRing && styles.avatarShellPurple]}>
          <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
        </View>
        {item.emojiBadge && (
          <View style={styles.emojiBadge}>
            <Text style={styles.emojiBadgeText}>{item.emojiBadge}</Text>
          </View>
        )}
      </View>

      <View style={styles.chatBody}>
        <View style={styles.nameRow}>
          <Text style={[styles.userName, item.isUnread && styles.userNameUnread]}>{item.name}</Text>
          {item.isAd && (
            <>
              <Text style={styles.adTag}>🌟</Text>
              <Text style={styles.adText}>Ad</Text>
            </>
          )}
        </View>

        <View style={styles.metaRow}>
          <View
            style={[
              styles.metaDot,
              item.accent === 'red' && styles.metaDotRed,
              !item.accent && styles.metaDotOutline,
            ]}
          />
          <Text style={[styles.previewText, item.isUnread && styles.previewTextUnread]}>
            {item.preview}
          </Text>
          {item.time && <Text style={styles.timeText}> · {item.time}</Text>}
          {item.streak && <Text style={styles.streakText}> {item.streak}</Text>}
        </View>
      </View>

      <RightAction type={item.rightIcon} />
    </TouchableOpacity>
  );
}

export default function SnapchatChatListScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <Header />
      <TabFilters />

      <FlatList
        data={CHATS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatRow item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
          <Text style={styles.navIcon}>⌂</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
          <Text style={styles.navIcon}>💬</Text>
          <View style={styles.navBadge}><Text style={styles.navBadgeText}>2</Text></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cameraNavItem} activeOpacity={0.8}>
          <View style={styles.cameraNavInner}>
            <View style={styles.cameraLens} />
            <View style={styles.cameraFlash} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
          <View style={styles.storyNavRing}>
            <Image source={{ uri: 'https://picsum.photos/seed/nav-story/80' }} style={styles.storyNavImg} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
          <Text style={styles.navIcon}>◉</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 14,
  },
  profileBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    overflow: 'hidden',
    backgroundColor: '#D5D2CF',
    borderWidth: 1,
    borderColor: '#C8C5C2',
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -1,
    marginHorizontal: 12,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.faintBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusGlyph: {
    fontSize: 18,
  },
  addBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  addGlyph: {
    fontSize: 18,
    color: COLORS.text,
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  filterTextActive: {
    fontWeight: '900',
  },
  filterCount: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.dark,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  filterCountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
  },
  aiPill: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  listContent: {
    paddingHorizontal: 18,
    paddingBottom: 110,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: COLORS.bg,
    borderTopWidth: 1,
    borderTopColor: '#E5E2DF',
  },
  navItem: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  navIcon: {
    fontSize: 22,
    color: COLORS.text,
  },
  navBadge: {
    position: 'absolute',
    top: -2,
    right: 1,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  navBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '800',
  },
  cameraNavItem: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#F2F1EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -14,
  },
  cameraNavInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.white,
    borderWidth: 4,
    borderColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cameraLens: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: '#111111',
    backgroundColor: '#fff',
  },
  cameraFlash: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#111111',
    top: 10,
    right: 12,
  },
  storyNavRing: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.purple,
    padding: 2,
  },
  storyNavImg: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  avatarWrap: {
    position: 'relative',
    width: 58,
    height: 58,
  },
  avatarShell: {
    width: 58,
    height: 58,
    borderRadius: 29,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#E8E3DF',
  },
  avatarShellPurple: {
    borderColor: COLORS.purple,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  emojiBadge: {
    position: 'absolute',
    left: -4,
    bottom: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  emojiBadgeText: {
    fontSize: 12,
  },
  chatBody: {
    flex: 1,
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  userNameUnread: {
    fontWeight: '900',
  },
  adTag: {
    fontSize: 10,
    marginLeft: 4,
  },
  adText: {
    fontSize: 14,
    color: COLORS.subtext,
    fontWeight: '600',
    marginLeft: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metaDot: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: COLORS.purple,
    marginRight: 6,
  },
  metaDotRed: {
    backgroundColor: COLORS.red,
  },
  metaDotOutline: {
    width: 10,
    height: 10,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: COLORS.red,
    backgroundColor: '#fff',
    marginRight: 6,
  },
  previewText: {
    fontSize: 15,
    color: COLORS.subtext,
    fontWeight: '500',
  },
  previewTextUnread: {
    color: COLORS.text,
    fontWeight: '700',
  },
  timeText: {
    fontSize: 14,
    color: COLORS.subtext,
    fontWeight: '500',
  },
  streakText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '700',
  },
  actionIcon: {
    fontSize: 22,
    marginLeft: 10,
    color: '#171717',
  },
  cameraAction: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  cameraActionText: {
    color: '#1A1A1A',
    fontSize: 15,
    fontWeight: '900',
  },
});
