(() => {
  "use strict";

  const I18N = {
    en: {
      overview: "Overview",
      workbench: "Workbench",
      challenges: "Challenges",
      drills: "Test cases",
      news: "News",
      brandAria: "Extension settings",
      welcome: "Welcome,",
      home: "Home",
      logout: "Log Out",
      securityCenter: "Security Center",
      currentRank: "CURRENT RANK",
      nextRank: "NEXT RANK",
      displayRanks: "Display ranks",
      copyUserId: "Copy user ID",
      userIdCopied: "ID copied",
      level: "Level",
      xpToLevel: "XP to level",
      totalXp: "Total XP",
      inspectionsHeading: "Inspections",
      lifetime: "Lifetime",
      thisSeason: "This season",
      thisWeek: "This week",
      inspectionsWord: "inspections",
      correctWord: "correct",
      wrongWord: "wrong",
      unresolvedWord: "unresolved",
      bansWord: "bans",
      accuracyHeading: "Inspection accuracy",
      recent: "Recent",
      weekly: "Weekly",
      seasonal: "Seasonal",
      overall: "Overall",
      ptsAbove: "pts above lifetime",
      ptsBelow: "pts below lifetime",
      ptsVs: "pts vs lifetime",
      todayHeading: "Today",
      ofWord: "of",
      casesRemaining: "cases remaining",
      quotaCompleted: "Daily quota completed",
      rankRules: "Rank rules",
      close: "Close",
      bonusXp: "bonus XP",
      noAccuracyGate: "No accuracy gate",
      recentAccuracy: "recent accuracy",
      successfulInspections: "successful inspections",
      exitInspection: "Exit Inspection",
      playback: "Playback",
      interface: "Interface",
      verdicts: "Verdicts",
      privacy: "Privacy",
      about: "About",
      searchPlaceholder: "Search settings (e.g., volume, hotkeys, privacy)...",
      savedToast: "Saved ✓",
      defaultsRestoredToast: "Defaults restored ✓",
      restoreDefaults: "Restore Defaults",
      resetSection: "Reset section",
      inspectedToday: "Inspected Today",
      casesRemainingToday: "cases remaining today",
      teammates: "Teammates",
      enemies: "Enemies",
      scavs: "Scavs (bots)",
      practiceCases: "Practice Cases",
      inspectionsLabel: "Inspections",
      validLabel: "Valid",
      officialInspectionNotes: "Official Inspection Notes",
    },
    de: {
      overview: "Datenübersicht",
      workbench: "Werkbank",
      challenges: "Herausforderungen",
      drills: "Übung",
      news: "Ankündigungen",
      brandAria: "Erweiterungseinstellungen",
      welcome: "Willkommen,",
      home: "Startseite",
      logout: "Abmelden",
      securityCenter: "Sicherheitszentrum",
      currentRank: "AKTUELLE STUFE",
      nextRank: "NÄCHSTE STUFE",
      displayRanks: "Stufen anzeigen",
      copyUserId: "User-ID kopieren",
      userIdCopied: "ID kopiert",
      level: "Stufe",
      xpToLevel: "EP bis Stufe",
      totalXp: "Gesamt-EP",
      inspectionsHeading: "Überprüfungen",
      lifetime: "Gesamt",
      thisSeason: "Diese Saison",
      thisWeek: "Diese Woche",
      inspectionsWord: "Überprüfungen",
      correctWord: "korrekt",
      wrongWord: "falsch",
      unresolvedWord: "ungelöst",
      bansWord: "Sperren",
      accuracyHeading: "Überprüfungsgenauigkeit",
      recent: "Aktuell",
      weekly: "Wöchentlich",
      seasonal: "Saisonal",
      overall: "Gesamt",
      ptsAbove: "Pkt. über Gesamt",
      ptsBelow: "Pkt. unter Gesamt",
      ptsVs: "Pkt. gg. Gesamt",
      todayHeading: "Heute",
      ofWord: "von",
      casesRemaining: "Fälle übrig",
      quotaCompleted: "Tageskontingent erreicht",
      rankRules: "Stufenregeln",
      close: "Schließen",
      bonusXp: "Bonus-EP",
      noAccuracyGate: "Keine Genauigkeitsgrenze",
      recentAccuracy: "aktuelle Genauigkeit",
      successfulInspections: "erfolgreiche Überprüfungen",
      exitInspection: "Inspektion beenden",
      playback: "Wiedergabe",
      interface: "Benutzeroberfläche",
      verdicts: "Urteile",
      privacy: "Datenschutz",
      about: "Über",
      searchPlaceholder: "Einstellungen suchen (z. B. Lautstärke, Hotkeys)...",
      savedToast: "Gespeichert ✓",
      defaultsRestoredToast: "Standard wiederhergestellt ✓",
      restoreDefaults: "Standard wiederherstellen",
      resetSection: "Abschnitt zurücksetzen",
      inspectedToday: "Heute überprüft",
      casesRemainingToday: "Fälle heute übrig",
      teammates: "Teamkameraden",
      enemies: "Gegner",
      scavs: "Scavs (Bots)",
      practiceCases: "Übungsfälle",
      inspectionsLabel: "Inspektionen",
      validLabel: "Gültig",
      officialInspectionNotes: "Offizielle Überprüfungshinweise",
    },
    ru: {
      overview: "Обзор данных",
      workbench: "Верстак",
      challenges: "Испытания",
      drills: "Практика",
      news: "Объявления",
      brandAria: "Настройки расширения",
      welcome: "Привет,",
      home: "Главная",
      logout: "Выйти",
      securityCenter: "Центр безопасности",
      currentRank: "ТЕКУЩИЙ РАНГ",
      nextRank: "СЛЕДУЮЩИЙ РАНГ",
      displayRanks: "Показать ранги",
      copyUserId: "Копировать ID",
      userIdCopied: "ID скопирован",
      level: "Уровень",
      xpToLevel: "опыта до ур.",
      totalXp: "Всего опыта",
      inspectionsHeading: "Инспекции",
      lifetime: "Всего",
      thisSeason: "Этот сезон",
      thisWeek: "Эта неделя",
      inspectionsWord: "инспекций",
      correctWord: "верно",
      wrongWord: "ошибок",
      unresolvedWord: "не решено",
      bansWord: "блокировок",
      accuracyHeading: "Точность инспекций",
      recent: "Недавняя",
      weekly: "За неделю",
      seasonal: "За сезон",
      overall: "Общая",
      ptsAbove: "п. выше общей",
      ptsBelow: "п. ниже общей",
      ptsVs: "п. к общей",
      todayHeading: "Сегодня",
      ofWord: "из",
      casesRemaining: "дел осталось",
      quotaCompleted: "Дневная норма выполнена",
      rankRules: "Правила рангов",
      close: "Закрыть",
      bonusXp: "бонусного опыта",
      noAccuracyGate: "Без порога точности",
      recentAccuracy: "недавняя точность",
      successfulInspections: "успешных инспекций",
      exitInspection: "Выйти из инспекции",
      playback: "Воспроизведение",
      interface: "Интерфейс",
      verdicts: "Вердикты",
      privacy: "Приватность",
      about: "О расширении",
      searchPlaceholder: "Поиск настроек (громкость, горячие клавиши)...",
      savedToast: "Сохранено ✓",
      defaultsRestoredToast: "Настройки сброшены ✓",
      restoreDefaults: "Восстановить по умолчанию",
      resetSection: "Сбросить раздел",
      inspectedToday: "Проверено сегодня",
      casesRemainingToday: "дел осталось сегодня",
      teammates: "Союзники",
      enemies: "Враги",
      scavs: "Дикие (боты)",
      practiceCases: "Тренировочные дела",
      inspectionsLabel: "Проверок",
      validLabel: "Действительно",
      officialInspectionNotes: "Официальные примечания",
    },
    fr: {
      overview: "Aperçu des données",
      workbench: "Établi",
      challenges: "Défis",
      drills: "S'entraîner",
      news: "Annonces",
      brandAria: "Paramètres de l'extension",
      welcome: "Bienvenue,",
      home: "Accueil",
      logout: "Déconnexion",
      securityCenter: "Centre de sécurité",
      currentRank: "RANG ACTUEL",
      nextRank: "RANG SUIVANT",
      displayRanks: "Afficher les rangs",
      copyUserId: "Copier l'identifiant",
      userIdCopied: "Identifiant copié",
      level: "Niveau",
      xpToLevel: "XP jusqu'au niv.",
      totalXp: "XP total",
      inspectionsHeading: "Inspections",
      lifetime: "Total",
      thisSeason: "Cette saison",
      thisWeek: "Cette semaine",
      inspectionsWord: "inspections",
      correctWord: "correctes",
      wrongWord: "fausses",
      unresolvedWord: "non résolues",
      bansWord: "exclusions",
      accuracyHeading: "Précision d'inspection",
      recent: "Récente",
      weekly: "Hebdomadaire",
      seasonal: "Saisonnière",
      overall: "Globale",
      ptsAbove: "pts au-dessus global",
      ptsBelow: "pts en dessous global",
      ptsVs: "pts vs global",
      todayHeading: "Aujourd'hui",
      ofWord: "sur",
      casesRemaining: "cas restants",
      quotaCompleted: "Quota journalier atteint",
      rankRules: "Règles des rangs",
      close: "Fermer",
      bonusXp: "XP bonus",
      noAccuracyGate: "Aucun seuil de précision",
      recentAccuracy: "précision récente",
      successfulInspections: "inspections réussies",
      exitInspection: "Quitter l'inspection",
      playback: "Lecture",
      interface: "Interface",
      verdicts: "Verdicts",
      privacy: "Confidentialité",
      about: "À propos",
      searchPlaceholder: "Rechercher des paramètres (volume, raccourcis)...",
      savedToast: "Enregistré ✓",
      defaultsRestoredToast: "Valeurs par défaut rétablies ✓",
      restoreDefaults: "Rétablir par défaut",
      resetSection: "Réinitialiser la section",
      inspectedToday: "Inspectés aujourd'hui",
      casesRemainingToday: "cas restants aujourd'hui",
      teammates: "Coéquipiers",
      enemies: "Ennemis",
      scavs: "Scavs (bots)",
      practiceCases: "Cas d'entraînement",
      inspectionsLabel: "Inspections",
      validLabel: "Valides",
      officialInspectionNotes: "Notes d'inspection officielles",
    },
    es: {
      overview: "Resumen de datos",
      workbench: "Banco de trabajo",
      challenges: "Desafíos",
      drills: "Práctica",
      news: "Anuncios",
      brandAria: "Ajustes de la extensión",
      welcome: "Hola,",
      home: "Inicio",
      logout: "Salir",
      securityCenter: "Centro de seguridad",
      currentRank: "RANGO ACTUAL",
      nextRank: "SIGUIENTE RANGO",
      displayRanks: "Mostrar rangos",
      copyUserId: "Copiar ID de usuario",
      userIdCopied: "ID copiado",
      level: "Nivel",
      xpToLevel: "EXP para nivel",
      totalXp: "EXP totales",
      inspectionsHeading: "Inspecciones",
      lifetime: "Total",
      thisSeason: "Esta temporada",
      thisWeek: "Esta semana",
      inspectionsWord: "inspecciones",
      correctWord: "correctas",
      wrongWord: "incorrectas",
      unresolvedWord: "sin resolver",
      bansWord: "bloqueos",
      accuracyHeading: "Precisión de inspección",
      recent: "Reciente",
      weekly: "Semanal",
      seasonal: "Estacional",
      overall: "General",
      ptsAbove: "pts sobre el total",
      ptsBelow: "pts bajo el total",
      ptsVs: "pts vs total",
      todayHeading: "Hoy",
      ofWord: "de",
      casesRemaining: "casos restantes",
      quotaCompleted: "Cuota diaria completada",
      rankRules: "Reglas de rango",
      close: "Cerrar",
      bonusXp: "EXP de bonificación",
      noAccuracyGate: "Sin umbral de precisión",
      recentAccuracy: "precisión reciente",
      successfulInspections: "inspecciones correctas",
      exitInspection: "Salir de la inspección",
      playback: "Reproducción",
      interface: "Interfaz",
      verdicts: "Veredictos",
      privacy: "Privacidad",
      about: "Acerca de",
      searchPlaceholder: "Buscar ajustes (volumen, atajos)...",
      savedToast: "Guardado ✓",
      defaultsRestoredToast: "Valores predeterminados restaurados ✓",
      restoreDefaults: "Restaurar valores predeterminados",
      resetSection: "Restablecer sección",
      inspectedToday: "Inspeccionados hoy",
      casesRemainingToday: "casos restantes hoy",
      teammates: "Compañeros",
      enemies: "Enemigos",
      scavs: "Scavs (bots)",
      practiceCases: "Casos de práctica",
      inspectionsLabel: "Inspecciones",
      validLabel: "Válidas",
      officialInspectionNotes: "Notas oficiales de inspección",
    },
    ja: {
      overview: "データの概要",
      workbench: "ワークベンチ",
      challenges: "チャレンジ",
      drills: "練習",
      news: "お知らせ",
      brandAria: "拡張機能の設定",
      welcome: "こんにちは、",
      home: "ホーム",
      logout: "ログアウト",
      securityCenter: "セキュリティ",
      currentRank: "現在のランク",
      nextRank: "次のランク",
      displayRanks: "ランクを表示",
      copyUserId: "ユーザーIDをコピー",
      userIdCopied: "IDをコピーしました",
      level: "レベル",
      xpToLevel: "XP 次のレベルまで",
      totalXp: "合計XP",
      inspectionsHeading: "検査",
      lifetime: "全期間",
      thisSeason: "今シーズン",
      thisWeek: "今週",
      inspectionsWord: "件の検査",
      correctWord: "正解",
      wrongWord: "不正解",
      unresolvedWord: "未確定",
      bansWord: "件のBAN",
      accuracyHeading: "検査の正確度",
      recent: "直近",
      weekly: "週間",
      seasonal: "シーズン",
      overall: "総合",
      ptsAbove: "pt 通算以上",
      ptsBelow: "pt 通算未満",
      ptsVs: "pt 通算比",
      todayHeading: "本日",
      ofWord: "/",
      casesRemaining: "件残り",
      quotaCompleted: "本日のノルマ完了",
      rankRules: "ランクのルール",
      close: "閉じる",
      bonusXp: "ボーナスXP",
      noAccuracyGate: "正確度の条件なし",
      recentAccuracy: "直近の正確度",
      successfulInspections: "回の合格検査",
      exitInspection: "検査を終了",
      playback: "再生",
      interface: "インターフェース",
      verdicts: "判定",
      privacy: "プライバシー",
      about: "詳細",
      searchPlaceholder: "設定を検索 (音量、ショートカット)...",
      savedToast: "保存済み ✓",
      defaultsRestoredToast: "デフォルトに戻しました ✓",
      restoreDefaults: "デフォルトに戻す",
      resetSection: "セクションをリセット",
      inspectedToday: "本日の検査",
      casesRemainingToday: "件残り (本日)",
      teammates: "味方",
      enemies: "敵",
      scavs: "ボット (Scav)",
      practiceCases: "練習ケース",
      inspectionsLabel: "検査数",
      validLabel: "有効数",
      officialInspectionNotes: "公式検査の注意事項",
    },
    "pt-BR": {
      overview: "Visão Geral dos Dados",
      workbench: "Espaço de Trabalho",
      challenges: "Desafios",
      drills: "Treinar",
      news: "Avisos",
      brandAria: "Configurações da extensão",
      welcome: "Olá,",
      home: "Início",
      logout: "Sair",
      securityCenter: "Central de Segurança",
      currentRank: "PATENTE ATUAL",
      nextRank: "PRÓXIMA PATENTE",
      displayRanks: "Exibir patentes",
      copyUserId: "Copiar ID do usuário",
      userIdCopied: "ID copiado",
      level: "Nível",
      xpToLevel: "XP até o nível",
      totalXp: "XP total",
      inspectionsHeading: "Inspeções",
      lifetime: "Geral",
      thisSeason: "Esta temporada",
      thisWeek: "Esta semana",
      inspectionsWord: "inspeções",
      correctWord: "corretas",
      wrongWord: "incorretas",
      unresolvedWord: "não resolvidas",
      bansWord: "banimentos",
      accuracyHeading: "Precisão da inspeção",
      recent: "Recente",
      weekly: "Semanal",
      seasonal: "Da temporada",
      overall: "Geral",
      ptsAbove: "pts acima do geral",
      ptsBelow: "pts abaixo do geral",
      ptsVs: "pts vs geral",
      todayHeading: "Hoje",
      ofWord: "de",
      casesRemaining: "casos restantes",
      quotaCompleted: "Cota diária concluída",
      rankRules: "Regras de patente",
      close: "Fechar",
      bonusXp: "XP bônus",
      noAccuracyGate: "Sem limite de precisão",
      recentAccuracy: "precisão recente",
      successfulInspections: "inspeções corretas",
      exitInspection: "Sair da Inspeção",
      playback: "Reprodução",
      interface: "Interface",
      verdicts: "Vereditos",
      privacy: "Privacidade",
      about: "Sobre",
      searchPlaceholder: "Buscar configurações (volume, atalhos)...",
      savedToast: "Salvo ✓",
      defaultsRestoredToast: "Padrões restaurados ✓",
      restoreDefaults: "Restaurar Padrões",
      resetSection: "Redefinir seção",
      inspectedToday: "Inspecionados hoje",
      casesRemainingToday: "casos restantes hoje",
      teammates: "Aliados",
      enemies: "Inimigos",
      scavs: "Scavs (bots)",
      practiceCases: "Casos de Treino",
      inspectionsLabel: "Inspeções",
      validLabel: "Válidas",
      officialInspectionNotes: "Notas Oficiais da Inspeção",
    },
    "zh-Hant": {
      overview: "數據總覽",
      workbench: "巡查工作台",
      challenges: "巡查挑戰",
      drills: "巡查演練",
      news: "巡查公告",
      brandAria: "擴展設置",
      welcome: "你好，",
      home: "首頁",
      logout: "退出",
      securityCenter: "安全中心",
      currentRank: "當前稱號",
      nextRank: "下一級稱號",
      displayRanks: "顯示稱號",
      copyUserId: "複製玩家ID",
      userIdCopied: "ID已複製",
      level: "等級",
      xpToLevel: "經驗升至等級",
      totalXp: "累計經驗",
      inspectionsHeading: "巡查記錄",
      lifetime: "累計",
      thisSeason: "本賽季",
      thisWeek: "本週",
      inspectionsWord: "單巡查",
      correctWord: "正確",
      wrongWord: "錯誤",
      unresolvedWord: "未決",
      bansWord: "封禁",
      accuracyHeading: "巡查準確率",
      recent: "近期",
      weekly: "本週",
      seasonal: "賽季",
      overall: "累計",
      ptsAbove: "高於累計",
      ptsBelow: "低於累計",
      ptsVs: "相比累計",
      todayHeading: "今日巡查",
      ofWord: "/",
      casesRemaining: "單剩餘",
      quotaCompleted: "今日巡查已達上限",
      rankRules: "稱號規則",
      close: "關閉",
      bonusXp: "額外經驗",
      noAccuracyGate: "無準確率要求",
      recentAccuracy: "近期準確率",
      successfulInspections: "單正確巡查",
      exitInspection: "退出巡查",
      playback: "播放",
      interface: "介面",
      verdicts: "裁決",
      privacy: "隱私",
      about: "關於",
      searchPlaceholder: "搜尋設定 (音量、快捷鍵)...",
      savedToast: "已儲存 ✓",
      defaultsRestoredToast: "已恢復預設值 ✓",
      restoreDefaults: "恢復預設值",
      resetSection: "重設此分組",
      inspectedToday: "今日已巡查",
      casesRemainingToday: "單今日剩餘",
      teammates: "隊友",
      enemies: "敵人",
      scavs: "電腦 (遊蕩者)",
      practiceCases: "巡查演練",
      inspectionsLabel: "演練量",
      validLabel: "正確量",
      officialInspectionNotes: "官方巡查說明",
    },
    cn: {
      overview: "数据总览",
      workbench: "巡查工作台",
      challenges: "巡查挑战",
      drills: "巡查演练",
      news: "巡查公告",
      brandAria: "扩展设置",
      welcome: "你好，",
      home: "首页",
      logout: "退出",
      securityCenter: "安全中心",
      currentRank: "当前称号",
      nextRank: "下一级称号",
      displayRanks: "显示称号",
      copyUserId: "复制玩家ID",
      userIdCopied: "ID已复制",
      level: "等级",
      xpToLevel: "经验升至等级",
      totalXp: "累计经验",
      inspectionsHeading: "巡查记录",
      lifetime: "累计",
      thisSeason: "本赛季",
      thisWeek: "本周",
      inspectionsWord: "单巡查",
      correctWord: "正确",
      wrongWord: "错误",
      unresolvedWord: "未决",
      bansWord: "封禁",
      accuracyHeading: "巡查准确率",
      recent: "近期",
      weekly: "本周",
      seasonal: "赛季",
      overall: "累计",
      ptsAbove: "高于累计",
      ptsBelow: "低于累计",
      ptsVs: "相比累计",
      todayHeading: "今日巡查",
      ofWord: "/",
      casesRemaining: "单剩余",
      quotaCompleted: "今日巡查已达上限",
      rankRules: "称号规则",
      close: "关闭",
      bonusXp: "额外经验",
      noAccuracyGate: "无准确率要求",
      recentAccuracy: "近期准确率",
      successfulInspections: "单正确巡查",
      exitInspection: "退出巡查",
      playback: "播放",
      interface: "界面",
      verdicts: "裁决",
      privacy: "隐私",
      about: "关于",
      searchPlaceholder: "搜索设置 (音量、快捷键)...",
      savedToast: "已保存 ✓",
      defaultsRestoredToast: "已恢复默认值 ✓",
      restoreDefaults: "恢复默认值",
      resetSection: "重置此分组",
      inspectedToday: "今日已巡查",
      casesRemainingToday: "单今日剩余",
      teammates: "队友",
      enemies: "敌人",
      scavs: "人机 (游荡者)",
      practiceCases: "巡查演练",
      inspectionsLabel: "演练量",
      validLabel: "正确量",
      officialInspectionNotes: "官方巡查说明",
    },
  };

  const RANK_TITLES = {
    en: ["Trainee Inspector", "Assistant Inspector", "Junior Inspector", "Intermediate Inspector", "Senior Inspector", "Expert + Lv. 35"],
    de: ["Inspektoranwärter", "Hilfsinspektor", "Junior-Inspektor", "Fortgeschrittener Inspektor", "Senior-Inspektor", "Experte + Stufe 35"],
    ru: ["Инспектор-стажер", "Инспектор-помощник", "Младший инспектор", "Инспектор среднего ранга", "Старший инспектор", "Эксперт: ур. 35"],
    fr: ["Inspecteur stagiaire", "Inspecteur assistant", "Inspecteur junior", "Inspecteur intermédiaire", "Inspecteur senior", "Expert + Niv. 35"],
    es: ["Inspector en formación", "Inspector asistente", "Inspector júnior", "Inspector intermedio", "Inspector sénior", "Experto + Nivel 35"],
    ja: ["見習い検査官", "補佐検査官", "ジュニア検査官", "中級検査官", "シニア検査官", "エキスパート + Lv.35"],
    "pt-BR": ["Inspetor Estagiário", "Inspetor Assistente", "Inspetor Júnior", "Inspetor Intermediário", "Inspetor Sênior", "Especialista + Nível 35"],
    "zh-Hant": ["實習巡查", "助理巡查", "初級巡查", "中級巡查", "高級巡查", "專家+等級35級"],
    cn: ["实习巡查", "助理巡查", "初级巡查", "中级巡查", "高级巡查", "专家+等级35级"],
  };

  const INSPECTION_NOTE_DATA = {
    en: {
      lead: "Distance markers and character colors are ",
      strong1: "added by the official inspection system",
      mid: " to help identify possible violations. They are ",
      strong2: "not effects created by the inspected player",
      end: " and do not, by themselves, indicate cheating.",
      practice: "All practice cases have predetermined outcomes. Your verdict will not affect the actual penalty.",
    },
    de: {
      lead: "Die Entfernungsmarkierungen und Charakterfarben werden ",
      strong1: "vom offiziellen Überprüfungssystem hinzugefügt",
      mid: ", um Verstöße zu identifizieren. Sie sind ",
      strong2: "keine Effekte des überprüften Spielers",
      end: " und stellen für sich allein keinen Betrug dar.",
      practice: "Alle Übungsfälle haben ein vorher festgelegtes Ergebnis. Dein Urteil wird keinen Einfluss auf die tatsächliche Strafe haben.",
    },
    ru: {
      lead: "Маркеры расстояния и подсветка персонажей ",
      strong1: "добавлены официальной системой инспекции",
      mid: " для облегчения выявления нарушений. Они ",
      strong2: "не являются эффектами подозреваемого игрока",
      end: " и сами по себе не означают читерство.",
      practice: "Все тренировочные кейсы имеют предопределённый исход. Ваш вердикт не повлияет на реальное наказание.",
    },
    fr: {
      lead: "Les marqueurs de distance et les couleurs des personnages sont ",
      strong1: "ajoutés par le système d'inspection officiel",
      mid: " pour faciliter l'identification des infractions. Ce ne sont ",
      strong2: "pas des effets créés par le joueur inspecté",
      end: " et ils n'indiquent pas, en soi, une tricherie.",
      practice: "Tous les scénarios d'entraînement ont des résultats prédéterminés. Votre verdict n'affectera pas la sanction actuelle.",
    },
    es: {
      lead: "Los marcadores de distancia y los colores de los personajes son ",
      strong1: "añadidos por el sistema oficial de inspección",
      mid: " para facilitar la detección de infracciones. ",
      strong2: "No son efectos creados por el jugador inspeccionado",
      end: " y no indican, por sí mismos, que esté haciendo trampas.",
      practice: "Todos los casos prácticos tienen resultados predeterminados. Tu veredicto no afectará la sanción real.",
    },
    ja: {
      lead: "動画内の距離マーカーやプレイヤーの色分けは、違反を特定しやすくするために",
      strong1: "公式の検査システムによって追加されたエフェクト",
      mid: "であり、",
      strong2: "被疑プレイヤーが意図して作成した効果ではありません",
      end: "。これ単体で不正行為を示すものではありません。",
      practice: "練習ケースはすべて、あらかじめ結果が決まっています。あなたの判定結果が、実際のペナルティに影響することはありません。",
    },
    "pt-BR": {
      lead: "Os marcadores de distância e as cores dos personagens são ",
      strong1: "adicionados pelo sistema oficial de inspeção",
      mid: " para ajudar na identificação de infrações. ",
      strong2: "Não são efeitos criados pelo jogador inspecionado",
      end: " e não indicam, por si mesmos, trapaça.",
      practice: "Todos os casos do treino têm resultados predeterminados. Seu veredito não afetará a penalidade real.",
    },
    "zh-Hant": {
      lead: "影片中人物的距離標記與染色是",
      strong1: "官方巡查系統為便於識別違規而添加的效果",
      mid: "，",
      strong2: "非被巡查玩家產生的效果",
      end: "，其本身並不代表作弊。",
      practice: "演練中的影片案例均已有明確結果，您所交付的結論不會影響實際的處罰結果。",
    },
    cn: {
      lead: "视频中人物的距离标记与染色是",
      strong1: "官方巡查系统为便于识别违规而添加的效果",
      mid: "，",
      strong2: "非被巡查玩家产生的效果",
      end: "，其本身并不代表作弊。",
      practice: "演练中的视频案例均已有明确结果，您所交付的结论不会影响实际的处罚结果。",
    },
  };

  function getCurrentLang() {
    let raw = "";
    if (typeof document !== "undefined" && document.documentElement?.dataset?.abiLang) {
      raw = document.documentElement.dataset.abiLang;
    } else if (typeof window !== "undefined") {
      try {
        raw = new URLSearchParams(window.location.search).get("lang") || "";
      } catch {}
      if (!raw) {
        try {
          raw = localStorage.getItem("arenabreakout_lang") || "";
        } catch {}
      }
      if (!raw) {
        try {
          raw = document.querySelector("._langNav_ .current")?.dataset?.lang || "";
        } catch {}
      }
      if (!raw && window.lang) {
        raw = window.lang;
      }
    }
    raw = (raw || "en").trim();
    const lower = raw.toLowerCase();
    if (lower === "pt-br" || lower === "pt") return "pt-BR";
    if (lower === "zh-hant" || lower === "zh-tw" || lower === "zh-hk") return "zh-Hant";
    if (lower === "cn" || lower === "zh-cn" || lower === "zh-hans" || lower === "zh") return "cn";
    if (I18N[lower]) return lower;
    return "en";
  }

  function t(key) {
    const lang = getCurrentLang();
    return I18N[lang]?.[key] ?? I18N.en[key] ?? "";
  }

  function formatCasesRemainingToday(count) {
    if (count <= 0) return t("quotaCompleted");
    const lang = getCurrentLang();
    switch (lang) {
      case "de":
        return `${count} Fälle heute übrig`;
      case "ru":
        return `${count} дел осталось сегодня`;
      case "fr":
        return `${count} cas restants aujourd'hui`;
      case "es":
        return `${count} casos restantes hoy`;
      case "ja":
        return `本日残り ${count} 件`;
      case "pt-BR":
        return `${count} casos restantes hoje`;
      case "zh-Hant":
        return `今日剩餘 ${count} 單`;
      case "cn":
        return `今日剩余 ${count} 单`;
      default:
        return `${count} cases remaining today`;
    }
  }

  function getLocalizedRankTitle(indexOrObj, lang) {
    const l = lang || getCurrentLang();
    const titles = RANK_TITLES[l] || RANK_TITLES.en;
    if (typeof indexOrObj === "number") return titles[indexOrObj] || titles[0];
    if (indexOrObj && typeof indexOrObj === "object") {
      const idx = ranks.findIndex((r) => r.required === indexOrObj.required);
      if (idx >= 0 && titles[idx]) return titles[idx];
      return indexOrObj.title;
    }
    return "";
  }

  if (typeof window !== "undefined") {
    window.I18N = I18N;
    window.RANK_TITLES = RANK_TITLES;
    window.INSPECTION_NOTE_DATA = INSPECTION_NOTE_DATA;
    window.getCurrentLang = getCurrentLang;
    window.t = t;
    window.formatCasesRemainingToday = formatCasesRemainingToday;
    window.getLocalizedRankTitle = getLocalizedRankTitle;
  }

  const labels = {
    mine: "Overview",
    working: "Workbench",
    patrol: "Challenges",
    drill: "Test cases",
    notice: "News",
  };
  const root = document.documentElement;
  const privacyStorageKey = "abi-screenshot-anonymized";
  const privacyMaskText = "***";
  const maskedTextNodes = new Map();
  let privacyAnonymized = false;
  try {
    privacyAnonymized = localStorage.getItem(privacyStorageKey) === "true";
  } catch {}
  const ranks = [
    { title: "Trainee Inspector", required: 0 },
    { title: "Assistant Inspector", required: 15 },
    { title: "Junior Inspector", required: 125 },
    { title: "Intermediate Inspector", required: 250 },
    { title: "Senior Inspector", required: 375 },
    { title: "Expert + Lv. 35", required: 475, levelRequired: 35 },
  ];
  let queued = false;
  let settingsViewState = null;
  let lastNavTab = null;
  document.addEventListener("abi:overview-updated", scheduleUpdate);
  document.addEventListener("abi:language-changed", (event) => {
    if (event?.detail?.lang) {
      document.documentElement.dataset.abiLang = event.detail.lang;
    }
    scheduleUpdate();
    setTimeout(scheduleUpdate, 100);
  });
  window.addEventListener("languagechange", scheduleUpdate);
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const dialog = document.querySelector("#wxMine > .abi-rank-dialog");
    if (!dialog || dialog.hidden) return;
    dialog.hidden = true;
    document.querySelector("#wxMine .abi-rank-open")?.focus();
  });
  document.addEventListener("click", (event) => {
    const navItem = event.target.closest(".main .nav li, .nav li, #mine, a[href*='mine']");
    if (navItem) {
      if (navItem.id === "mine" || navItem.textContent.includes("Overview") || navItem.matches(".str22")) {
        const mineHost = document.querySelector("#wxMine");
        if (mineHost) {
          for (const el of mineHost.querySelectorAll("[data-abi-progress-ready]")) {
            delete el.dataset.abiProgressReady;
            if (el.classList.contains("abi-today-ring-fill")) {
              el.style.strokeDashoffset = "320.44";
            } else {
              el.style.width = "0%";
            }
          }
        }
      }
      scheduleUpdate();
      setTimeout(scheduleUpdate, 80);
      return;
    }

    const noticeNavItem = event.target.closest(".notice-nav li");
    if (noticeNavItem) {
      scheduleUpdate();
      setTimeout(scheduleUpdate, 100);
      return;
    }

    const langItem = event.target.closest("._langNav_ li, [class*='lang'] li");
    if (langItem) {
      const selected = langItem.dataset?.lang;
      if (selected) {
        document.documentElement.dataset.abiLang = selected;
      }
      scheduleUpdate();
      setTimeout(scheduleUpdate, 150);
      setTimeout(scheduleUpdate, 400);
      return;
    }
  }, true);

  function updateNavigation() {
    queued = false;
    observer.disconnect();
    try {
      updateNavigationWork();
    } finally {
      observer.takeRecords();
      observer.observe(document.documentElement, observerConfig);
    }
  }


  const WATERMARK = `
================================================================================
  ABI INSPECTOR EXTENDED \u2014 v2.6.3
  Enhanced Patroller Interface & Local Playback Controls
  Author: deem (https://github.com/mkornela)
  Status: Extension Loaded & Active
================================================================================
`;
  function insertWatermark() {
    const rootEl = typeof root !== "undefined" ? root : document.documentElement;
    if (rootEl.dataset.abiWatermark === "loaded") return;
    try {
      if (document.documentElement && document.createTreeWalker) {
        const innerWalker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_COMMENT);
        const innerToRemove = [];
        while (innerWalker.nextNode()) {
          const val = innerWalker.currentNode.nodeValue || "";
          if (val.includes("ABI INSPECTOR EXTENDED")) {
            innerToRemove.push(innerWalker.currentNode);
          }
        }
        for (const node of innerToRemove) {
          try { node.remove(); } catch {}
        }
      }
      let alreadyOutside = false;
      for (let child = document.firstChild; child; child = child.nextSibling) {
        if (child === document.documentElement) break;
        if (child.nodeType === Node.COMMENT_NODE && (child.nodeValue || "").includes("ABI INSPECTOR EXTENDED")) {
          alreadyOutside = true;
          break;
        }
      }
      if (!alreadyOutside) {
        const target = document.documentElement || document.firstChild;
        if (target && document.insertBefore) {
          document.insertBefore(document.createComment(WATERMARK), target);
        }
      }
    } catch {}
    rootEl.dataset.abiWatermark = "loaded";
  }

  function logExtensionBanner() {
    if (window.__abiExtendedBannerLogged) return;
    window.__abiExtendedBannerLogged = true;
    try {
      console.log(
        "%c ABI INSPECTOR EXTENDED %c v2.6.3 %c deem %c ACTIVE \n%cEnhanced Patroller Interface & Local Playback Controls (https://github.com/mkornela)",
        "background: #d49a37; color: #0b0f11; font-weight: bold; font-family: monospace; border-radius: 3px 0 0 3px; padding: 3px 8px; font-size: 11px;",
        "background: #182226; color: #d49a37; font-weight: bold; font-family: monospace; padding: 3px 8px; font-size: 11px; border-left: 1px solid #2a373c;",
        "background: #222f35; color: #c4d0d0; font-family: monospace; padding: 3px 8px; font-size: 11px; border-left: 1px solid #2a373c;",
        "background: #238636; color: #ffffff; font-weight: bold; font-family: monospace; border-radius: 0 3px 3px 0; padding: 3px 8px; font-size: 11px;",
        "color: #8fa0a5; font-size: 11px; padding: 4px 0 2px 2px; font-family: system-ui, sans-serif;"
      );
    } catch {}
  }

  const HAS_CJK = /[\u3400-\u9fff\uff00-\uffef]/;
  function removeChineseComments(rootNode = document) {
    if (!rootNode || !document.createTreeWalker) return;
    try {
      const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_COMMENT);
      const toRemove = [];
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node && HAS_CJK.test(node.nodeValue || "")) {
          toRemove.push(node);
        }
      }
      for (const node of toRemove) {
        try { node.remove(); } catch {}
      }
    } catch {}
  }

  const SITE_TRANSLATIONS = [
  [
    "自《Arena Breakout: Infinite》正式上线以来，《Arena Breakout: Infinite》安全营运团队一直致力于打造和平游戏环境，我们相当重视游戏相关违规行为（包括但不限于：使用或宣传外挂、与外挂玩家组队、消极游戏等）",
    "Since the official launch of Arena Breakout: Infinite, the Security Operations Team has been dedicated to creating a fair and secure gaming environment. We maintain a zero-tolerance policy against game violations (including but not limited to: using or promoting cheats, teaming with cheaters, passive gameplay, etc.)."
  ],
  [
    "​​A：​​ 可以尝试从寻人、瞄准、开枪等游戏行动中的移动路径、位置判定、开枪时机、掩体分布、射击表现信息，确认是否有可疑点。各巡查员也可通过“巡查演示”了解巡查技巧，通过“巡查演练”进行练习，有助于提升巡查水平。",
    "A: Observe target acquisition, pre-aiming, tracking through cover, recoil anomalies, and crosshair placement. Practice drills are available to refine your detection techniques."
  ],
  [
    "​​A：​​ 巡查挑战赛季切换时，会重置赛季巡查等级、积分经验，刷新赛季巡查等级相关奖励。其他巡查数据如正确巡查数、近期巡查准确率、巡查称号等，都不会随赛季重置，但专家巡查称号在赛季切换时会重新评选。",
    "A: Season XP, seasonal challenge ranks, and tier rewards reset with each new season. Career totals, accuracy, and core inspector badges persist, though Expert Inspector title is re-evaluated seasonally."
  ],
  [
    "巡查员由热心玩家组成，但获得巡查资格并不代表与官方达成雇佣或从属关系，巡查员行为并不代表官方，不具备封号、解封、代举报、代申诉等能力；巡查员不得利用巡查资格发布封号、解封、举报、申诉的虚假信息。",
    "Inspectors are dedicated community players. Qualification does not establish an employment or affiliate relationship with the company. Inspectors do not represent the official stance and cannot ban, unban, report, or appeal on behalf of players. False claims of official power are strictly prohibited."
  ],
  [
    "需注意，提交不确定会扣除每日巡查次数，但不会影响准确率。但针对消极巡查（随意提交巡查结果，包括频繁提交“不确定”等行为），将降低准确率，甚至冻结巡查资格，请客观判断违规行为，谨慎提交巡查结果。",
    "Note: Submitting 'Uncertain' counts toward daily quota but does not hurt accuracy. However, abusive or negligent verdicts (such as mass Uncertain submissions) will lower your rating or suspend privileges."
  ],
  [
    "​​A：​​ 优异的历史竞赛表现和良好的游戏行为记录，无疑是成为巡查员的必要条件，大家可以在视频巡查系统中点开始巡查申请成为巡查员，我们会给满足巡查条件的玩家，逐步开放巡查功能。",
    "A: Excellent match history and a clean disciplinary record are essential. Players can apply directly in the system via 'Start Inspection'. Access is rolled out gradually to eligible candidates."
  ],
  [
    "​​A：​​ 不是，视频中的染色、方框、距离显示，是官方后期添加的，旨在帮助巡查员更好识别被举报玩家是否有违规。同时，视频中没有显示房间门、物资，也不是被举报玩家的作弊效果。",
    "A: No. Player highlights, distance tags, and silhouettes are official playback overlays added to assist inspectors. Missing doors or props in replays are replay engine optimizations, not player hacks."
  ],
  [
    "​​A：​​ 提交未违规，经官方核实确认未违规，也会算正确单数，只有确认是违规的玩家才会被判罚。另外，每个视频要经过多个巡查员巡查，可能您参与巡查的单，还没有出最终结果。",
    "A: Correctly identifying innocent players counts toward your accuracy score, but only violators are penalized. Also, cases require multiple inspectors to achieve consensus before final rulings."
  ],
  [
    "须使用官方视频巡查功能进行巡查，不得使用第三方视频进行任何形式的巡查；不得利用巡查资格或身份实施诈骗、敲诈勒索、恶意攻击他人、损害他人名誉或损害巡查员集体声誉；",
    "Must use the official video inspection feature. Third-party videos may not be used. Inspectors must not use their status for fraud, blackmail, attacks on others, defamation, or damaging the reputation of the inspector team;"
  ],
  [
    "​​A：​​ 每个被举报的可疑对局视频，会随机推送给多位巡查员进行综合巡查判定，再通过官方团队对巡查员提交的结果做最终审核确认后，才会对违规玩家执行处罚。​",
    "A: Each video is independently reviewed by multiple inspectors. Official security analysts conduct final verification before any account suspension is applied."
  ],
  [
    "​​A：​​ 判定结果选择”违规“时，勾选具体违规内容为”外挂车队“即可。此外官方还有自动策略识别被举报玩家是否为坐挂车，若核实是坐挂车会自动进行处罚。",
    "A: If the suspect is playing with a cheater, select 'Violation' and choose 'Teaming with Cheaters'. Automated backend systems also independently flag and penalize cheater squads."
  ],
  [
    "​​A：​​ 视频巡查员和其他玩家一样，核实存在违反腾讯游戏用户协议时，同样会视情节实施对应处罚，包括但不限于封号、删除视频巡查资格、数据、奖励等。",
    "A: Inspectors are held to the same high standard. Verified violations result in penalties including account bans, revocation of inspector credentials, and clawback of rewards."
  ],
  [
    "​​A：​​ 专家巡查称号在每次赛季切换时重新评选，其他称号是实时评选，当满足对应称号条件时可晋级，低于对应称号条件（例如准确率下降）则会降级。",
    "A: Intermediate and Senior titles upgrade in real time upon reaching threshold case counts and accuracy. Expert Inspector is awarded each season to top performers. Falling below accuracy thresholds can result in demotion."
  ],
  [
    "​​A：​​ 暂不满足巡查资格的玩家，可以在视频巡查系统中参与巡查演练，了解巡查员们是怎么识别、打击作弊的，为成为一名合格的巡查员做好准备。",
    "A: Players who do not yet meet the criteria can take part in Inspection Drills to learn cheat detection workflows and prepare for qualification."
  ],
  [
    "​​A：​​ 专属士气章暂时是限时道具，每个赛季都可以获取。后续我们会根据玩家晋升专家巡查员的赛季达成数，考虑开放永久的专属士气章奖励。",
    "A: The seasonal Morale Badge is currently temporary and re-earned each season. Permanent morale badges for multi-season Expert Inspectors are planned."
  ],
  [
    "​​A：​​ 当确认视频中被举报玩家有违规时，请提交有违规；确认没违规时，请提交无违规；若视频信息不足以判断时，请提交不确定。",
    "A: Submit 'Violation' when cheating is confirmed; submit 'No Violation' when clear; submit 'Uncertain' if evidence is insufficient."
  ],
  [
    "巡查员一旦出现以上违规行为，除按照暗区突围安全规则处罚外，还可能依据影响范围、严重程度受到以下额外处罚：",
    "Inspectors who commit violations are subject to security rules, and depending on impact and severity, the following additional penalties:"
  ],
  [
    "当前视频信息不足以对举报玩家做出明确判断时，请选择“证据不足”，视频将会交由其他巡查员或官方进行审核。",
    "When the footage is insufficient to draw a definitive conclusion, select 'Insufficient Evidence'. The clip will be reviewed by other inspectors or staff."
  ],
  [
    "3）官网-安全站-点击右下角位置的巡查社区按钮悬浮窗进入巡查社区后打开巡查工作台，即可进行视频巡查。",
    "3) Official Site -> Security -> click Inspector Community badge at bottom right to open Workbench."
  ],
  [
    "）官网-安全站-点击右下角位置的巡查社区按钮悬浮窗进入巡查社区后打开巡查工作台，即可进行视频巡查。",
    "3) Official Site -> Security -> click Inspector Community badge at bottom right to open Workbench."
  ],
  [
    "​​A：​​ 基于每个赛季游戏内反作弊问卷的玩家反馈，我们也会考虑提供种类更加丰富的巡查专属奖励。",
    "A: Yes. We review community survey feedback each season to introduce updated and expanded inspector-exclusive rewards."
  ],
  [
    "​​A：​​ 不是，服务器在生成视频后，会随机分派给多个巡查员，不会直接分派给对应举报人。",
    "A: No. Replay clips are anonymized and randomly dispatched across the inspector pool to maintain impartiality."
  ],
  [
    "3、演练中的视频案例，均已有明确结果，您的提交结论不会影响实际的处罚结果，请放心巡查",
    "3. Practice drill cases have pre-determined outcomes. Your verdict will not affect actual player penalties; please inspect with confidence."
  ],
  [
    "Q：视频中人物显示了方框和染色、还显示了敌人的距离，是被举报玩家的作弊效果吗？​​",
    "Q: Are bounding boxes, distance markers, and colored outlines cheats used by the suspect?"
  ],
  [
    "提交不确定的次数有限，会计入当天的巡查单数，但不会影响准确率，请选择不确定原因：",
    "The number of Uncertain submissions is limited. It counts toward today's inspection quota but does not affect accuracy. Please select the reason:"
  ],
  [
    "尊敬的 B.D.C 执行部精英，欢迎回到「暗链监察组」“白铁号”货轮移动据点，",
    "Respected elite of the B.D.C Operations Division, welcome back to the 'White Iron' mobile base of the Dark Link Inspection Team."
  ],
  [
    "巡查员应以认真负责、客观公正的态度对被巡查玩家进行评判，并遵循以下行为规范：",
    "Inspectors must evaluate reported players with a serious, responsible, objective, and fair attitude, and adhere to the following code of conduct:"
  ],
  [
    "因视频异常影响判定，请提交“视频异常”并补充相关描述，官方进一步核查修复。",
    "If video anomalies prevent evaluation, select 'Video Anomaly' with details for technical review."
  ],
  [
    "​​Q：视频巡查员违反腾讯游戏用户协议怎么办，会回收巡查专属奖励吗？​​",
    "Q: What happens if an inspector violates the User Agreement?"
  ],
  [
    "1、视频中人物距离、染色，是官方为了便于识别违规而添加的效果，非作弊效果",
    "1. Player distance indicators and outline coloring are official aids added to facilitate violation identification, not player cheats."
  ],
  [
    "玩家视频巡查系统，旨在通过广大玩家的共同努力，为玩家营造公平竞技环境。",
    "The Player Video Inspection System aims to create a fair competitive environment for all players through community cooperation."
  ],
  [
    "尊敬的先锋，您目前还未成为B.D.C执行部一员，请先进行巡查资格申请",
    "Respected Pioneer, you are not yet a member of the B.D.C Operations Division. Please apply for inspector qualifications first."
  ],
  [
    "很遗憾，先锋没有通过本次考核先锋可以通过演练进行练习,提高准确率。",
    "Unfortunately, you did not pass this assessment. You can practice in drills to improve your accuracy."
  ],
  [
    "我们已为您收集到了足够多的前线档案，请进入情报室工作台开始巡查",
    "We have collected sufficient frontline dossiers for you. Please proceed to the Workbench to begin inspection."
  ],
  [
    "​​Q：巡查记录中正确单数和已判罚违规玩家数为什么不一样？​​",
    "Q: Why does the number of accurate verdicts differ from punished players?"
  ],
  [
    "您本次选择无违规，请确认已完整仔细查看完整视频，避免遗漏违规点",
    "You selected No Violation. Please confirm you have thoroughly watched the full video to avoid missing violations."
  ],
  [
    "提交不确定的次数有限，会计入当天的巡查单数，但不会影响准确率，",
    "The number of Uncertain submissions is limited. It counts toward today's inspection quota but does not affect accuracy,"
  ],
  [
    "恭喜先锋获得<strong>巡查员</strong>资格!",
    "Congratulations Pioneer, you have been granted <strong>Inspector</strong> status!"
  ],
  [
    "2）游戏内活动中心-更多活动-点击活动内容的巡查社区按钮",
    "2) In-game Event Center -> More Events -> tap Inspector Community in event banner."
  ],
  [
    "​​Q：我看到的视频是我自己举报的玩家对应的视频吗？​​",
    "Q: Are the videos assigned to me the ones I personally reported?"
  ],
  [
    "2、染色说明：红色为被淘汰者，身体出现黄色边框为敌对可见",
    "2. Color coding: Red indicates eliminated players; yellow outline indicates visible to enemies."
  ],
  [
    "）游戏内活动中心-更多活动-点击活动内容的巡查社区按钮",
    "2) In-game Event Center -> More Events -> Inspector Community button."
  ],
  [
    "1）游戏内个人资料-信誉分-点击右上角的巡查社区按钮",
    "1) In-game Profile -> Credit Score -> tap the Inspector Community button in top right."
  ],
  [
    "​​Q：专家巡查称号奖励的士气章是时效性道具吗？​​",
    "Q: Is the Morale Badge reward temporary?"
  ],
  [
    "​​Q：巡查等级和巡查称号奖励会有变化和升级吗？​​",
    "Q: Will inspector level and title rewards be updated?"
  ],
  [
    "您的手机系统版本过低请升级至安卓7.0或以上再尝试。",
    "Your operating system version is unsupported. Please upgrade to continue."
  ],
  [
    "）游戏内个人资料-信誉分-点击右上角的巡查社区按钮",
    "1) In-game Profile -> Credit Score -> Inspector Community button in top right."
  ],
  [
    "2、染色说明：队友为绿色，敌人为橙黄色，人机为蓝色",
    "2. Color coding: Teammates are Green, Enemies are Orange-Yellow, Bots are Blue."
  ],
  [
    "​​Q：提交有违规后，被举报玩家会被封号吗？​​",
    "Q: Will a reported player get banned immediately after submitting 'Violation'?"
  ],
  [
    "您本次选择无违规，请确认已完整仔细查看完整视频，",
    "You selected No Violation. Please confirm you have thoroughly watched the full video,"
  ],
  [
    "未完成巡查演练（巡查10单并达到准确率70%）",
    "Inspection drill not completed (complete 10 cases with ≥ 70% accuracy)"
  ],
  [
    "​​A：​​ 通过以下链路可以进入巡查社区：",
    "A: You can enter the Inspector Community via the following methods:"
  ],
  [
    "3、 根据违规行为后果，依法追究法律责任。",
    "3. Legal action may be taken based on consequences of the violation."
  ],
  [
    "​​Q：不是巡查员可以参与视频巡查吗？​​",
    "Q: Can players who are not Inspectors participate in inspections?"
  ],
  [
    "​​Q：被举报玩家的队友违规怎么判定？​​",
    "Q: How do I handle violations committed by the suspect's teammates?"
  ],
  [
    "​​Q：提交不确定，会影响巡查准确率吗？",
    "Q: Does submitting 'Uncertain' affect inspection accuracy?"
  ],
  [
    "​​A：​​ 以下情况可提交“不确定”：",
    "A: You may submit 'Uncertain' in the following cases:"
  ],
  [
    "​​Q：怎么判断被举报玩家是否违规？​​",
    "Q: How do I judge whether a suspect is cheating?"
  ],
  [
    "​​Q：赛季切换时，会重置哪些数据？​​",
    "Q: What stats reset at the end of each season?"
  ],
  [
    "1、 删除视频巡查资格、数据、奖励等。",
    "1. Revocation of video inspection status, data, and rewards."
  ],
  [
    "先锋可以通过演练进行练习,提高准确率。",
    "You can practice in drills to improve your accuracy."
  ],
  [
    "2、 若存在官方合作，取消相关合作。",
    "2. Termination of any official collaborations."
  ],
  [
    "根据违规行为后果，依法追究法律责任。",
    "Legal action may be taken based on consequences of the violation."
  ],
  [
    "如有具体违规描述可补充（最多50字）",
    "Describe the violation if you can (optional, max 50 characters)"
  ],
  [
    "您暂不符合巡查员申请条件，具体如下:",
    "You currently do not meet the Inspector application requirements:"
  ],
  [
    "您暂不符合巡查员申请条件，具体如下：",
    "You currently do not meet the Inspector application requirements:"
  ],
  [
    "遵守暗区突围《游戏安全处罚规则》；",
    "Comply with the Arena Breakout Game Security Penalty Rules;"
  ],
  [
    "​​Q：巡查称号是怎么晋级的？​ ",
    "Q: How do Inspector titles advance?"
  ],
  [
    "删除视频巡查资格、数据、奖励等。",
    "Revocation of video inspection status, data, and rewards."
  ],
  [
    "​​Q：视频巡查的入口在哪？​​",
    "Q: Where can I access Video Inspection?"
  ],
  [
    "​​Q：巡查称号是怎么晋级的？​",
    "Q: How do Inspector titles advance?"
  ],
  [
    "请升级至安卓7.0或以上再尝试。",
    "Please upgrade to continue."
  ],
  [
    "若存在官方合作，取消相关合作。",
    "Termination of any official collaborations."
  ],
  [
    "​​Q：怎么提交巡查结果？​​",
    "Q: How do I submit inspection verdicts?"
  ],
  [
    "目前参与人数过多，请稍后再试~",
    "The server is currently experiencing high traffic. Please try again shortly."
  ],
  [
    "Q：怎么成为视频巡查员？​​",
    "Q: How do I become a Video Inspector?"
  ],
  [
    "很遗憾，先锋没有通过本次考核",
    "Unfortunately, you did not pass this assessment."
  ],
  [
    "不得将账号外借交他人巡查；",
    "Do not lend your account to others for inspection;"
  ],
  [
    "补充证据不足（最多50字）",
    "Add details on why the evidence is insufficient (optional, max 50 characters)"
  ],
  [
    "服务网络异常，请稍后重试。",
    "Server network error. Please try again later."
  ],
  [
    "巡查称号升级规则及奖励说明",
    "Inspector Title Progression & Rewards"
  ],
  [
    "无作弊相关历史违规记录;",
    "No cheating-related penalty history;"
  ],
  [
    "无作弊相关历史违规记录；",
    "No cheating-related penalty history;"
  ],
  [
    "恭喜先锋获得巡查员资格!",
    "Congratulations Pioneer, you have been granted Inspector status!"
  ],
  [
    "接口请求中，请稍后再试~",
    "A request is currently in progress. Please wait a moment and try again."
  ],
  [
    "服务网络异常，请稍后重试",
    "Server network error. Please try again later."
  ],
  [
    "抱歉，你暂未获取巡查资格",
    "Notice: You currently do not have inspector authorization."
  ],
  [
    "赛季段位在英雄及以上;",
    "Season rank Hero or above;"
  ],
  [
    "赛季段位在英雄及以上；",
    "Season rank Hero or above;"
  ],
  [
    "无作弊相关历史违规记录",
    "No cheating-related penalty history"
  ],
  [
    "部分处罚名单，定期更新",
    "Partial penalty list, updated periodically"
  ],
  [
    "赛季段位在英雄及以上",
    "Season rank Hero or above"
  ],
  [
    "您的手机系统版本过低",
    "Your operating system version is unsupported."
  ],
  [
    "网络繁忙,请稍后重试",
    "Network busy. Please try again in a moment."
  ],
  [
    "网络繁忙，请稍后重试",
    "Network busy. Please try again in a moment."
  ],
  [
    "亲爱的暗区先锋们：",
    "Dear Pioneers:"
  ],
  [
    "正式巡查注意事项：",
    "Official Inspection Guidelines:"
  ],
  [
    "巡查演练注意事项:",
    "Drill Inspection Guidelines:"
  ],
  [
    "请选择不确定原因：",
    "Please select the reason for Uncertain:"
  ],
  [
    "您已经是巡查员了！",
    "You are already an Inspector."
  ],
  [
    "信誉分>1400",
    "Credit score > 1400"
  ],
  [
    "查看巡查功能介绍",
    "View Inspector Overview"
  ],
  [
    "您已经是巡查员了",
    "You are already an Inspector."
  ],
  [
    "视频1加载异常！",
    "Video failed to load."
  ],
  [
    "恶意利用游戏漏洞",
    "Malicious Bug Exploit"
  ],
  [
    "巡查查封记录数量",
    "Total Confirmed Penalties"
  ],
  [
    "周正确巡查10单",
    "Complete 10 accurate inspections this week"
  ],
  [
    "中级+等级35级",
    "Intermediate + Lv. 35"
  ],
  [
    "高级+等级35级",
    "Senior + Lv. 35"
  ],
  [
    "巡查员违规处罚",
    "Penalties for Inspector Violations"
  ],
  [
    "巡查员行为规范",
    "Inspector Code of Conduct"
  ],
  [
    "避免遗漏违规点",
    "to avoid missing violations."
  ],
  [
    "您的巡查结果：",
    "Your Verdict: "
  ],
  [
    "违规内容选项：",
    "Violation Types: "
  ],
  [
    "巡查演练结果：",
    "Official Result: "
  ],
  [
    "自瞄、子弹追踪",
    "Aimbot, Bullet Tracking"
  ],
  [
    "累计巡查正确数",
    "Total Accurate"
  ],
  [
    "近期巡查正确率",
    "Recent Accuracy Rate"
  ],
  [
    "封禁3650天",
    "Banned for 10 Years"
  ],
  [
    "巡查等级10级",
    "Inspector Level 10"
  ],
  [
    "巡查等级15级",
    "Inspector Level 15"
  ],
  [
    "巡查等级20级",
    "Inspector Level 20"
  ],
  [
    "巡查等级25级",
    "Inspector Level 25"
  ],
  [
    "巡查等级30级",
    "Inspector Level 30"
  ],
  [
    "巡查等级35级",
    "Inspector Level 35"
  ],
  [
    "标准子弹自选包",
    "Standard Ammo Pack"
  ],
  [
    "四级头盔自选包",
    "T4 Helmet Pack"
  ],
  [
    "安全达人-徽章",
    "Security Master Badge"
  ],
  [
    "安全小队介绍",
    "Security Team Overview"
  ],
  [
    "前往巡查演练",
    "Go to Inspection Drill"
  ],
  [
    "恭喜先锋获得",
    "Congratulations Pioneer, you have been granted "
  ],
  [
    "恭喜您晋升为",
    "Congratulations on your promotion to "
  ],
  [
    "演练结果反馈",
    "Drill Result Feedback"
  ],
  [
    "您的巡查结果",
    "Your Verdict"
  ],
  [
    "违规内容选项",
    "Violation Types"
  ],
  [
    "巡查演练结果",
    "Official Result"
  ],
  [
    "违规类型选择",
    "Select Violation Types"
  ],
  [
    "使用作弊工具",
    "Using Cheat Tools"
  ],
  [
    "利用游戏漏洞",
    "Bug Exploit"
  ],
  [
    "首次达成奖励",
    "First-time Reward"
  ],
  [
    "初级巡查II",
    "Junior Inspector II"
  ],
  [
    "查封记录详情",
    "Penalty Records Detail"
  ],
  [
    "累计巡查数量",
    "Total Inspected"
  ],
  [
    "本周巡查数量",
    "Inspected This Week"
  ],
  [
    "封禁365天",
    "Banned for 1 Year"
  ],
  [
    "周巡查10单",
    "Complete 10 inspections this week"
  ],
  [
    "巡查等级5级",
    "Inspector Level 5"
  ],
  [
    "提交失败！",
    "Submission failed."
  ],
  [
    "加速或瞬移",
    "Speedhack / Teleport"
  ],
  [
    "近期准确率",
    "Recent Accuracy"
  ],
  [
    "实习巡查员",
    "Trainee Inspector"
  ],
  [
    "助理巡查员",
    "Assistant Inspector"
  ],
  [
    "初级巡查员",
    "Junior Inspector"
  ],
  [
    "中级巡查员",
    "Intermediate Inspector"
  ],
  [
    "高级巡查员",
    "Senior Inspector"
  ],
  [
    "专家巡查员",
    "Expert Inspector"
  ],
  [
    "巡查等级：",
    "Inspector Level: "
  ],
  [
    "巡查工作台",
    "Workbench"
  ],
  [
    "进入工作台",
    "Enter Workbench"
  ],
  [
    "今天已巡查",
    "Inspected Today"
  ],
  [
    "封禁10年",
    "Banned for 10 Years"
  ],
  [
    "封禁30天",
    "Banned for 30 Days"
  ],
  [
    "十年大礼包",
    "10-Year Ban"
  ],
  [
    "专属士气章",
    "Exclusive Morale Badge"
  ],
  [
    "进阶套装券",
    "Advanced Bundle Voucher"
  ],
  [
    "欢迎您，请",
    "Welcome, please "
  ],
  [
    "开始巡查",
    "Start Inspection"
  ],
  [
    "资格申请",
    "Apply for Qualification"
  ],
  [
    "先去练习",
    "Practice First"
  ],
  [
    "巡查公告",
    "Announcements"
  ],
  [
    "返回首页",
    "Back to Home"
  ],
  [
    "安全中心",
    "Security Center"
  ],
  [
    "常见问题",
    "Frequently Asked Questions (FAQ)"
  ],
  [
    "提交失败",
    "Submission failed."
  ],
  [
    "继续练习",
    "Continue Practice"
  ],
  [
    "无后坐力",
    "No Recoil"
  ],
  [
    "范围伤害",
    "Area Damage"
  ],
  [
    "飞天遁地",
    "Flying / Under-Map"
  ],
  [
    "外挂车队",
    "Teaming with Cheaters"
  ],
  [
    "证据不足",
    "Insufficient Evidence"
  ],
  [
    "视频异常",
    "Video Anomaly"
  ],
  [
    "子弹追踪",
    "Bullet Tracking"
  ],
  [
    "温馨提示",
    "Notice"
  ],
  [
    "巡查称号",
    "Inspector Title"
  ],
  [
    "正确单数",
    "Correct Cases"
  ],
  [
    "经验加成",
    "XP Bonus"
  ],
  [
    "实习巡查",
    "Trainee Inspector"
  ],
  [
    "助理巡查",
    "Assistant Inspector"
  ],
  [
    "初级巡查",
    "Junior Inspector"
  ],
  [
    "中级巡查",
    "Intermediate Inspector"
  ],
  [
    "高级巡查",
    "Senior Inspector"
  ],
  [
    "专家巡查",
    "Expert Inspector"
  ],
  [
    "巡查等级",
    "Inspector Level "
  ],
  [
    "暂无级别",
    "Unranked"
  ],
  [
    "数据总览",
    "Overview"
  ],
  [
    "巡查挑战",
    "Challenges"
  ],
  [
    "巡查演练",
    "Test cases"
  ],
  [
    "查封记录",
    "Penalty Records"
  ],
  [
    "巡查时间",
    "Inspection Time"
  ],
  [
    "角色昵称",
    "Character Nickname"
  ],
  [
    "演练量：",
    "Drills Completed: "
  ],
  [
    "正确量：",
    "Correct Drills: "
  ],
  [
    "处罚名单",
    "Penalty List"
  ],
  [
    "巡查规范",
    "Guidelines"
  ],
  [
    "玩家昵称",
    "Player Nickname"
  ],
  [
    "处罚结果",
    "Penalty Result"
  ],
  [
    "封禁7天",
    "Banned for 7 Days"
  ],
  [
    "封禁3天",
    "Banned for 3 Days"
  ],
  [
    "封禁1天",
    "Banned for 1 Day"
  ],
  [
    "每周挑战",
    "Weekly Challenges"
  ],
  [
    "限定挑战",
    "Exclusive Challenges"
  ],
  [
    "退出巡查",
    "Exit Inspection"
  ],
  [
    "欢迎您，",
    "Welcome, "
  ],
  [
    "暗区先锋",
    "Pioneer"
  ],
  [
    "安全站",
    "Security Station"
  ],
  [
    "巡查员",
    "Inspector"
  ],
  [
    "柯恩币",
    "Koen"
  ],
  [
    "去完成",
    "Go"
  ],
  [
    "已领取",
    "Claimed"
  ],
  [
    "已完成",
    "Completed"
  ],
  [
    "未完成",
    "Incomplete"
  ],
  [
    "有违规",
    "Violation"
  ],
  [
    "不违规",
    "No Violation"
  ],
  [
    "无违规",
    "No Violation"
  ],
  [
    "不确定",
    "Uncertain"
  ],
  [
    "资格!",
    "Qualification!"
  ],
  [
    "官网",
    "Official Site"
  ],
  [
    "透视",
    "Wallhack / ESP"
  ],
  [
    "自瞄",
    "Aimbot"
  ],
  [
    "其他",
    "Other"
  ],
  [
    "提示",
    "Notice"
  ],
  [
    "封号",
    "Account Ban"
  ],
  [
    "封禁",
    "Banned"
  ],
  [
    "禁言",
    "Muted"
  ],
  [
    "金币",
    "Bonds"
  ],
  [
    "领取",
    "Claim"
  ],
  [
    "违规",
    "Violation"
  ],
  [
    "登录",
    "Log In"
  ],
  [
    "退出",
    "Log Out"
  ],
  [
    "确定",
    "OK"
  ],
  [
    "取消",
    "Cancel"
  ],
  [
    "提交",
    "Submit"
  ],
  [
    "关闭",
    "Close"
  ],
  [
    "无",
    "None"
  ]
];
  const NUM_MAP = [
  [
    "1、",
    "1. "
  ],
  [
    "2、",
    "2. "
  ],
  [
    "3、",
    "3. "
  ],
  [
    "4、",
    "4. "
  ],
  [
    "5、",
    "5. "
  ]
];
  const PUNCT_MAP = [
  [
    "：",
    ": "
  ],
  [
    "；",
    "; "
  ],
  [
    "，",
    ", "
  ],
  [
    "。",
    ". "
  ],
  [
    "！",
    "!"
  ],
  [
    "？",
    "?"
  ],
  [
    "（",
    " ("
  ],
  [
    "）",
    ") "
  ],
  [
    "“",
    "\""
  ],
  [
    "”",
    "\""
  ],
  [
    "‘",
    "'"
  ],
  [
    "’",
    "'"
  ],
  [
    "、",
    ", "
  ],
  [
    "【",
    " ["
  ],
  [
    "】",
    "] "
  ]
];

  const translatedNodes = new Set();
  const originalTextMap = new WeakMap();
  const translatedAttrs = new Set();
  const originalAttrMap = new WeakMap();

  function translateTextNode(node) {
    if (!node || node.nodeType !== Node.TEXT_NODE) return;
    const val = node.nodeValue;
    if (!val || !HAS_CJK.test(val)) return;
    if (!originalTextMap.has(node)) {
      originalTextMap.set(node, val);
      translatedNodes.add(node);
    }
    let res = val;
    for (const [cn, en] of SITE_TRANSLATIONS) {
      if (res.includes(cn)) res = res.replaceAll(cn, en);
    }
    for (const [cn, en] of NUM_MAP) {
      if (res.includes(cn)) res = res.replaceAll(cn, en);
    }
    for (const [cn, en] of PUNCT_MAP) {
      if (res.includes(cn)) res = res.replaceAll(cn, en);
    }
    if (res !== val) {
      node.nodeValue = res;
    }
  }

  function translateAttr(el, attrName) {
    if (!el || !el.hasAttribute(attrName)) return;
    const val = el.getAttribute(attrName);
    if (!val || !HAS_CJK.test(val)) return;
    if (!originalAttrMap.has(el)) originalAttrMap.set(el, {});
    const map = originalAttrMap.get(el);
    if (map[attrName] === undefined) {
      map[attrName] = val;
      translatedAttrs.add({ el, attrName });
    }
    let res = val;
    for (const [cn, en] of SITE_TRANSLATIONS) {
      if (res.includes(cn)) res = res.replaceAll(cn, en);
    }
    for (const [cn, en] of NUM_MAP) {
      if (res.includes(cn)) res = res.replaceAll(cn, en);
    }
    for (const [cn, en] of PUNCT_MAP) {
      if (res.includes(cn)) res = res.replaceAll(cn, en);
    }
    if (res !== val) el.setAttribute(attrName, res);
  }

  function translateChineseContent(enabled) {
    const getLang = typeof getCurrentLang === "function"
      ? getCurrentLang
      : (typeof window !== "undefined" && typeof window.getCurrentLang === "function"
        ? window.getCurrentLang
        : () => (typeof document !== "undefined" && document.documentElement?.dataset?.abiLang) || "en");
    const currentLang = (getLang() || "en").toLowerCase();
    const shouldTranslate = enabled && (currentLang === "en" || !currentLang);
    if (!shouldTranslate) {
      for (const node of translatedNodes) {
        if (originalTextMap.has(node)) {
          node.nodeValue = originalTextMap.get(node);
          originalTextMap.delete(node);
        }
      }
      translatedNodes.clear();
      for (const item of translatedAttrs) {
        const map = originalAttrMap.get(item.el);
        if (map && map[item.attrName] !== undefined) {
          item.el.setAttribute(item.attrName, map[item.attrName]);
          delete map[item.attrName];
        }
      }
      translatedAttrs.clear();
      return;
    }

    if (!document.createTreeWalker) return;
    const rootEl = typeof root !== "undefined" ? root : document.documentElement;
    try {
      const walker = document.createTreeWalker(
        document.body || rootEl,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            const tag = parent.tagName;
            if (
              tag === "SCRIPT" ||
              tag === "STYLE" ||
              tag === "TEXTAREA" ||
              parent.closest(".abi-extension-brand, .abi-settings-dialog, .abi-rank-dialog")
            ) {
              return NodeFilter.FILTER_REJECT;
            }
            return HAS_CJK.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
          },
        },
      );
      while (walker.nextNode()) {
        translateTextNode(walker.currentNode);
      }
      for (const el of (document.body || rootEl).querySelectorAll("[placeholder], [title], [aria-label]")) {
        if (el.hasAttribute("placeholder")) translateAttr(el, "placeholder");
        if (el.hasAttribute("title")) translateAttr(el, "title");
        if (el.hasAttribute("aria-label")) translateAttr(el, "aria-label");
      }
    } catch {}
  }

  let autoEnteredInspection = false;
  function autoEnterInspection() {
    if (autoEnteredInspection) return;
    if (root.dataset.abiSite === "off" || root.dataset.abiSkipIntro === "off") return;
    const indexPage = document.querySelector(".index.upon-login");
    if (indexPage) {
      autoEnteredInspection = true;
      root.dataset.abiEntered = "true";

      // Hide the intro layer directly without triggering blocked javascript: URL navigations
      document.querySelectorAll(".index").forEach((el) => {
        el.style.display = "none";
      });

      // Ensure Overview tab is active
      const mineTab = document.querySelector(".main .nav #mine, .nav #mine, .main .nav li:first-child");
      if (mineTab && !mineTab.classList.contains("current")) {
        mineTab.click();
      }
    }
  }

  function updateNavigationWork() {
    insertWatermark();
    logExtensionBanner();
    removeChineseComments(document);
    const enabled = root.dataset.abiSite !== "off";
    translateChineseContent(enabled);
    autoEnterInspection();
    restorePrivacyMask();
    updateAccountToolbar();
    const nav = document.querySelector(".main .nav");
    if (!nav || !root.hasAttribute("data-abi-site")) {
      applyPrivacyMask();
      return;
    }

    const currentLang = getCurrentLang();
    const navKeyMap = {
      mine: "overview",
      working: "workbench",
      patrol: "challenges",
      drill: "drills",
      notice: "news",
    };

    for (const [id, labelKey] of Object.entries(navKeyMap)) {
      const item = nav.querySelector(`#${id}`);
      if (!item) continue;

      const textNode = [...item.childNodes].find(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim(),
      );
      if (!item.dataset.abiOriginalLabel && textNode) {
        item.dataset.abiOriginalLabel = textNode.textContent.trim();
      }

      const localizedLabel = currentLang === "en" ? labels[id] : t(labelKey);
      const target = enabled ? localizedLabel : item.dataset.abiOriginalLabel;
      if (target && textNode?.textContent.trim() !== target) {
        if (textNode) textNode.textContent = target;
        else item.append(document.createTextNode(target));
      }
      const accessibleLabel = target || localizedLabel;
      if (item.getAttribute("aria-label") !== accessibleLabel) {
        item.setAttribute("aria-label", accessibleLabel);
      }
    }

    const activeTab = nav.querySelector("li.current");
    const isInspectionTab = Boolean(
      activeTab?.id === "working" ||
      activeTab?.id === "drill" ||
      activeTab?.classList.contains("str24") ||
      activeTab?.classList.contains("str26"),
    );
    const shouldShowBrand = enabled && !isInspectionTab;
    let brand = nav.querySelector(":scope > .abi-extension-brand");

    if (shouldShowBrand && !brand) {
      brand = document.createElement("li");
      brand.className = "abi-extension-brand";
      brand.setAttribute("role", "button");
      brand.setAttribute("tabindex", "0");
      brand.setAttribute("aria-label", t("brandAria"));

      const name = document.createElement("span");
      name.className = "abi-brand-name";
      name.textContent = "ABI Inspector Extended";

      brand.append(name);
      nav.append(brand);
    } else if (brand && shouldShowBrand) {
      brand.setAttribute("aria-label", t("brandAria"));
    } else if (!shouldShowBrand) {
      if (brand || settingsViewState) deactivateSettings(nav);
      brand?.remove();
    }

    nav.classList.toggle("abi-has-brand", shouldShowBrand);
    updateHeaderSlot(nav);
    configureSettingsNavigation(nav, brand);
    updateColorKey(enabled && root.dataset.abiColorKey !== "off");
    updateInspectionNote(enabled && root.dataset.abiInspectionNotes !== "off");
    updateInspectionTitle(
      enabled && root.dataset.abiInspectionNotes !== "off",
    );
    updateGuidelines(enabled);
    updateFaq(enabled);
    updateDrillCounters(enabled);
    updateWorkbenchStatus(enabled);
    updateInspectorProfile(enabled);
    updateExitButton(enabled);
    updateChallengeRewards(enabled);
    updateChallengeProgressLabels(enabled);
    updateOverview(enabled);
    applyPrivacyMask();
  }

  function updateAccountToolbar() {
    const topNav = document.querySelector(".top-nav");
    const sourceName = topNav?.querySelector("#s3_1");
    const sourceLogout = topNav?.querySelector("#a3_1");
    const sourceHome = topNav?.querySelector(".home-btn");
    const sourceSecurity = topNav?.querySelector(".safe-link");
    if (!topNav || !sourceName || !sourceLogout || !sourceHome || !sourceSecurity) return;

    let actions = topNav.querySelector(":scope > .abi-topbar-actions");
    if (!actions) {
      actions = document.createElement("div");
      actions.className = "abi-topbar-actions";

      const identity = document.createElement("span");
      identity.className = "abi-account-name";
      const welcome = document.createElement("span");
      welcome.className = "abi-account-welcome";
      welcome.textContent = t("welcome");
      const name = document.createElement("strong");
      name.className = "abi-account-name-text";
      identity.append(welcome, name);

      const home = document.createElement("button");
      home.type = "button";
      home.className = "abi-account-button abi-home-button";
      home.textContent = t("home");
      home.addEventListener("click", () => sourceHome.click());

      const logout = document.createElement("button");
      logout.type = "button";
      logout.className = "abi-account-button abi-logout-button";
      logout.textContent = t("logout");
      logout.addEventListener("click", () => sourceLogout.click());

      const security = document.createElement("a");
      security.className = "abi-account-button abi-security-button";
      security.textContent = t("securityCenter");
      security.target = "_blank";
      security.rel = "noopener noreferrer";
      actions.append(identity, home, logout, security);
      topNav.append(actions);
    }

    const welcome = actions.querySelector(".abi-account-welcome");
    if (welcome && welcome.textContent !== t("welcome")) welcome.textContent = t("welcome");
    const homeBtn = actions.querySelector(".abi-home-button") || actions.querySelectorAll(".abi-account-button")[0];
    if (homeBtn && homeBtn.textContent !== t("home")) homeBtn.textContent = t("home");
    const logoutBtn = actions.querySelector(".abi-logout-button") || actions.querySelectorAll(".abi-account-button")[1];
    if (logoutBtn && logoutBtn.textContent !== t("logout")) logoutBtn.textContent = t("logout");

    const userName = actions.querySelector(".abi-account-name-text");
    if (userName && userName.textContent !== sourceName.textContent) {
      userName.textContent = sourceName.textContent;
    }
    const security = actions.querySelector(".abi-security-button");
    if (security) {
      if (security.textContent !== t("securityCenter")) security.textContent = t("securityCenter");
      if (security.href !== sourceSecurity.href) security.href = sourceSecurity.href;
    }

    const loginPanel = topNav.querySelector("#login");
    const guestPanel = topNav.querySelector("#unlogin");
    const guestInlineDisplay = guestPanel?.style.display || "";
    const loggedIn = guestPanel
      ? guestInlineDisplay
        ? guestInlineDisplay === "none"
        : getComputedStyle(guestPanel).display === "none"
      : getComputedStyle(loginPanel || sourceName).display !== "none";
    const toolbarEnabled = loggedIn && root.dataset.abiSite !== "off";
    actions.hidden = !toolbarEnabled;
    topNav.classList.toggle("abi-account-ready", toolbarEnabled);
    const langBtn = topNav.querySelector("#langBtn") || document.querySelector("#langBtn");
    if (toolbarEnabled) {
      if (langBtn && langBtn.parentElement !== actions) {
        actions.append(langBtn);
      }
    } else if (langBtn && langBtn.parentElement === actions) {
      topNav.insertBefore(langBtn, actions);
    }
    for (const source of [
      topNav.querySelector("#login"),
      sourceHome,
      sourceSecurity,
    ]) {
      source?.classList.toggle("abi-account-source-hidden", toolbarEnabled);
    }
  }

  function applyPrivacyMask() {
    root.toggleAttribute("data-abi-anonymized", privacyAnonymized);
    const privateSelectors = [
      ".top-nav #s3_1",
      ".abi-account-name-text",
      ".username",
      ".userid > span",
      "[id^='roleOpenid']",
      ".honor > span",
      "#level-text",
      "#exp_level",
      "#wxMine .abi-rank-kicker",
      "#wxMine .abi-rank-caption",
      "#wxMine .abi-rank-percent",
      "#wxMine .abi-rank-count",
      "#wxMine .abi-level-percent",
      "#wxMine .abi-level-current",
      "#wxMine .abi-level-maximum",
      "#wxMine .abi-level-caption",
      "#wxMine .abi-level-label",
      "#wxMine .abi-level-xp",
      "#wxMine .abi-today-count",
      "#wxMine .abi-today-remaining",
      "#wxMine .abi-stat-trend",
      "#wxMine .abi-stat-sublabel",
      "#wxMine .abi-stat-item strong",
      "#wxMine .abi-period-total strong",
      "#wxMine .abi-legend-item",
      "#wxMine .abi-inspection-accuracy",
      "#wxMine .abi-inspection-bans strong",
      "#wxMine .abi-stat-delta",
      "#wxMine .abi-rank-card h3",
      "#wxMine .abi-rank-card p",
      "#wxMine .abi-rank-bonus",
      ".drill-data strong",
      "#wxPatrol .taks-info > span",
    ].join(",");

    for (const element of document.querySelectorAll(privateSelectors)) {
      if (privacyAnonymized) {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const textNode = walker.currentNode;
          if (!textNode.nodeValue.trim() || maskedTextNodes.has(textNode)) continue;
          maskedTextNodes.set(textNode, textNode.nodeValue);
          textNode.nodeValue = privacyMaskText;
        }
      }
    }

    for (const element of document.querySelectorAll(
      "#wxMine .abi-rank-fill, #wxMine .abi-level-fill, #wxMine .abi-today-fill, #wxPatrol .task-progress > div",
    )) {
      if (privacyAnonymized) element.classList.add("abi-private-progress");
    }
  }

  function restorePrivacyMask() {
    for (const [textNode, originalText] of maskedTextNodes) {
      if (textNode.isConnected) textNode.nodeValue = originalText;
    }
    maskedTextNodes.clear();

    // Restore nodes masked by the earlier overlay-based implementation.
    for (const element of document.querySelectorAll(".abi-private-value")) {
      const originalHtml = element.dataset.abiPrivateOriginalHtml;
      if (originalHtml !== undefined) element.innerHTML = originalHtml;
      element.classList.remove("abi-private-value");
      delete element.dataset.abiPrivateOriginalHtml;
      delete element.dataset.abiPrivateLabel;
    }
    for (const element of document.querySelectorAll(".abi-private-progress")) {
      element.classList.remove("abi-private-progress");
    }
  }

  const settingsDefaults = {
    controls: true,
    site: true,
    playerVolume: 100,
    playbackSpeed: 1,
    autoPlay: true,
    loopVideo: false,
    skipIntro: true,
    inspectionNotes: true,
    colorKey: true,
    verdictEnhancements: true,
    verdictHotkeys: false,
  };

  function getExtensionVersion() {
    try {
      if (typeof chrome !== "undefined" && chrome?.runtime?.getManifest) {
        return chrome.runtime.getManifest()?.version || "2.6.3";
      }
    } catch {}
    return "2.6.3";
  }

  function safeStorageGet(defaults) {
    return new Promise((resolve) => {
      try {
        if (typeof chrome !== "undefined" && chrome?.storage?.local?.get) {
          let resolved = false;
          const done = (data) => {
            if (resolved) return;
            resolved = true;
            if (chrome?.runtime?.lastError) {
              resolve({ ...defaults });
            } else {
              resolve(data || { ...defaults });
            }
          };
          const res = chrome.storage.local.get(defaults, done);
          if (res && typeof res.then === "function") {
            res.then((data) => done(data)).catch(() => done({ ...defaults }));
          }
          return;
        }
      } catch {}
      resolve({ ...defaults });
    });
  }

  function safeStorageSet(data) {
    return new Promise((resolve) => {
      try {
        if (typeof chrome !== "undefined" && chrome?.storage?.local?.set) {
          let resolved = false;
          const done = () => {
            if (resolved) return;
            resolved = true;
            resolve(!chrome?.runtime?.lastError);
          };
          const res = chrome.storage.local.set(data, done);
          if (res && typeof res.then === "function") {
            res.then(() => done()).catch(() => {
              if (!resolved) { resolved = true; resolve(false); }
            });
          }
          return;
        }
      } catch {}
      resolve(false);
    });
  }

  function createSettingsPanel() {
    const panel = document.createElement("section");
    panel.className = "abi-extension-settings";
    panel.setAttribute("aria-label", "ABI Inspector Extended Settings");

    // 0. Sticky Topbar: Search & Saved Toast
    const topbar = document.createElement("div");
    topbar.className = "abi-settings-topbar";

    const searchBar = document.createElement("div");
    searchBar.className = "abi-settings-search-bar";
    searchBar.setAttribute("role", "search");

    const searchIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    searchIcon.setAttribute("class", "abi-settings-search-icon");
    searchIcon.setAttribute("viewBox", "0 0 24 24");
    searchIcon.setAttribute("fill", "none");
    searchIcon.setAttribute("stroke", "currentColor");
    searchIcon.setAttribute("stroke-width", "2");
    searchIcon.setAttribute("aria-hidden", "true");
    searchIcon.innerHTML = '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>';

    const searchInput = document.createElement("input");
    searchInput.type = "search";
    searchInput.className = "abi-settings-search-input";
    searchInput.placeholder = "Search settings (e.g., volume, hotkeys, privacy)...";
    searchInput.setAttribute("aria-label", "Search settings");

    const searchClear = document.createElement("button");
    searchClear.type = "button";
    searchClear.className = "abi-settings-search-clear";
    searchClear.textContent = "✕";
    searchClear.title = "Clear search";
    searchClear.setAttribute("aria-label", "Clear search");
    searchClear.hidden = true;

    searchBar.append(searchIcon, searchInput, searchClear);

    const toast = document.createElement("div");
    toast.className = "abi-settings-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.textContent = "Saved ✓";

    topbar.append(searchBar, toast);

    let toastTimer = null;
    function showToast(msg = "Saved ✓") {
      toast.textContent = msg;
      toast.classList.add("show");
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove("show");
      }, 1500);
    }

    // Two-Column Layout Wrapper
    const layout = document.createElement("div");
    layout.className = "abi-settings-layout";

    // Left Sidebar Navigation
    const nav = document.createElement("nav");
    nav.className = "abi-settings-nav";
    nav.setAttribute("aria-label", "Settings sections");

    const navSections = [
      { id: "abi-section-playback", label: "Playback" },
      { id: "abi-section-interface", label: "Interface" },
      { id: "abi-section-verdicts", label: "Verdicts" },
      { id: "abi-section-privacy", label: "Privacy" },
      { id: "abi-section-about", label: "About" },
    ];

    for (const sec of navSections) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "abi-settings-nav-btn";
      btn.dataset.target = `#${sec.id}`;
      btn.textContent = sec.label;
      if (sec.id === "abi-section-playback") btn.classList.add("active");
      btn.addEventListener("click", () => {
        const target = panel.querySelector(`#${sec.id}`);
        if (target) {
          const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          target.scrollIntoView({ behavior: isReduced ? "auto" : "smooth", block: "start" });
        }
        nav.querySelectorAll(".abi-settings-nav-btn").forEach((b) => b.classList.toggle("active", b === btn));
      });
      nav.append(btn);
    }

    // Main Content Column
    const body = document.createElement("div");
    body.className = "abi-settings-body abi-settings-content";

    // Empty state container
    const emptyState = document.createElement("div");
    emptyState.className = "abi-settings-empty";
    emptyState.hidden = true;
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "No settings match your search.";
    emptyState.append(emptyMsg);
    body.append(emptyState);

    // Helper for Section Headings
    function makeSectionHeading(titleText, onReset = null) {
      const head = document.createElement("div");
      head.className = "abi-settings-section-heading";
      const title = document.createElement("h2");
      title.textContent = titleText;
      head.append(title);
      if (onReset) {
        const resetBtn = document.createElement("button");
        resetBtn.type = "button";
        resetBtn.className = "abi-settings-reset-section-btn";
        resetBtn.textContent = "Reset section";
        resetBtn.title = `Reset ${titleText} to defaults`;
        resetBtn.addEventListener("click", onReset);
        head.append(resetBtn);
      }
      return head;
    }

    // Helper for Key Chips
    function makeKeyChips(chips) {
      const wrap = document.createElement("div");
      wrap.className = "abi-key-chips";
      for (const item of chips) {
        const chip = document.createElement("span");
        chip.className = "abi-key-chip";
        chip.innerHTML = item;
        wrap.append(chip);
      }
      return wrap;
    }

    // 1. Playback Card
    const playback = document.createElement("section");
    playback.id = "abi-section-playback";
    playback.className = "abi-settings-group";
    playback.setAttribute("aria-labelledby", "abi-settings-playback-title");

    const controlRow = makeSettingsToggle(
      "abi-settings-controls",
      "controls",
      "Video controls & shortcuts",
      "Show the local player toolbar, frame-by-frame navigation, and playback shortcuts.",
      "playback video player controls pause play seek frame volume shortcuts fullscreen space k j l",
      makeKeyChips([
        "<kbd>Space</kbd> Play/Pause",
        "<kbd>K</kbd> Pause",
        "<kbd>J</kbd> / <kbd>L</kbd> ±5s",
        "<kbd>←</kbd> / <kbd>→</kbd> ±1s",
        "<kbd>,</kbd> / <kbd>.</kbd> Frame",
        "<kbd>M</kbd> Mute",
        "<kbd>F</kbd> Fullscreen",
      ]),
      showToast,
    );

    const autoPlayRow = makeSettingsToggle(
      "abi-settings-autoplay",
      "autoPlay",
      "Auto-play on load",
      "Start playback automatically when opening an inspection case.",
      "autoplay play start automatic video",
      null,
      showToast,
    );

    const loopRow = makeSettingsToggle(
      "abi-settings-loop",
      "loopVideo",
      "Loop playback",
      "Automatically repeat the evidence video when reaching the end.",
      "loop repeat video replay",
      null,
      showToast,
    );

    const volumeRow = document.createElement("div");
    volumeRow.className = "abi-settings-volume";
    volumeRow.dataset.keywords = "volume audio sound mute loudness default player";
    const volumeLabel = document.createElement("label");
    volumeLabel.htmlFor = "abi-settings-volume-slider";
    volumeLabel.textContent = "Default player volume";
    const volumeOutput = document.createElement("output");
    volumeOutput.htmlFor = volumeLabel.htmlFor;
    volumeOutput.textContent = "100%";
    const volumeHeading = document.createElement("div");
    volumeHeading.className = "abi-settings-volume-heading";
    volumeHeading.append(volumeLabel, volumeOutput);

    const volumeHelp = document.createElement("p");
    volumeHelp.textContent = "Remembered for future inspection videos.";

    const volumeSlider = document.createElement("input");
    volumeSlider.id = volumeLabel.htmlFor;
    volumeSlider.type = "range";
    volumeSlider.min = "0";
    volumeSlider.max = "100";
    volumeSlider.step = "1";
    volumeSlider.setAttribute("aria-label", "Default player volume");

    const volumePresets = document.createElement("div");
    volumePresets.className = "abi-volume-presets";
    const syncVolumeChips = (val) => {
      volumePresets.querySelectorAll(".abi-volume-chip").forEach((c) => {
        c.classList.toggle("active", Number(c.dataset.v) === Number(val));
      });
    };

    volumeSlider.addEventListener("input", () => {
      volumeOutput.value = `${volumeSlider.value}%`;
      volumeSlider.style.setProperty("--abi-volume-fill", `${volumeSlider.value}%`);
      syncVolumeChips(volumeSlider.value);
    });
    volumeSlider.addEventListener("change", () => {
      safeStorageSet({ playerVolume: Number(volumeSlider.value) });
      showToast("Saved ✓");
    });

    for (const [pLabel, pVal] of [["Mute (0%)", 0], ["50%", 50], ["100%", 100]]) {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "abi-volume-chip";
      chip.dataset.v = String(pVal);
      chip.textContent = pLabel;
      chip.addEventListener("click", () => {
        volumeSlider.value = String(pVal);
        volumeOutput.value = `${pVal}%`;
        volumeSlider.style.setProperty("--abi-volume-fill", `${pVal}%`);
        syncVolumeChips(pVal);
        safeStorageSet({ playerVolume: pVal });
        showToast("Saved ✓");
      });
      volumePresets.append(chip);
    }
    volumeRow.append(volumeHeading, volumeHelp, volumeSlider, volumePresets);

    const speedRow = document.createElement("div");
    speedRow.className = "abi-settings-speed";
    speedRow.dataset.keywords = "speed rate fast slow playback 1x 1.25x 1.5x 2x";
    const speedLabel = document.createElement("label");
    speedLabel.textContent = "Default playback speed";
    const speedOutput = document.createElement("output");
    speedOutput.textContent = "1×";
    const speedHeading = document.createElement("div");
    speedHeading.className = "abi-settings-speed-heading";
    speedHeading.append(speedLabel, speedOutput);

    const speedHelp = document.createElement("p");
    speedHelp.textContent = "Initial speed applied to new inspection videos.";

    const speedPresets = document.createElement("div");
    speedPresets.className = "abi-speed-presets";
    const speedRates = [1, 1.25, 1.5, 2];
    for (const rate of speedRates) {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "abi-speed-chip";
      chip.dataset.speed = String(rate);
      chip.textContent = `${rate}×`;
      chip.addEventListener("click", () => {
        speedPresets.querySelectorAll(".abi-speed-chip").forEach((c) => c.classList.toggle("active", c === chip));
        speedOutput.textContent = `${rate}×`;
        safeStorageSet({ playbackSpeed: rate });
        showToast("Saved ✓");
      });
      speedPresets.append(chip);
    }
    speedRow.append(speedHeading, speedHelp, speedPresets);

    const playbackHead = makeSectionHeading("Playback", async () => {
      const playbackDefaults = {
        controls: true,
        autoPlay: true,
        loopVideo: false,
        playerVolume: 100,
        playbackSpeed: 1,
      };
      await safeStorageSet(playbackDefaults);
      panel.querySelector("#abi-settings-controls").checked = true;
      panel.querySelector("#abi-settings-autoplay").checked = true;
      panel.querySelector("#abi-settings-loop").checked = false;
      volumeSlider.value = "100";
      volumeOutput.value = "100%";
      volumeSlider.style.setProperty("--abi-volume-fill", "100%");
      syncVolumeChips(100);
      speedOutput.textContent = "1×";
      speedPresets.querySelectorAll(".abi-speed-chip").forEach((c) => c.classList.toggle("active", c.dataset.speed === "1"));
      updateSettingsStatus(panel, await safeStorageGet(settingsDefaults));
      showToast("Playback reset ✓");
    });
    playbackHead.querySelector("h2").id = "abi-settings-playback-title";

    playback.append(playbackHead, controlRow, autoPlayRow, loopRow, volumeRow, speedRow);

    // 2. Interface Card
    const interfaceGroup = document.createElement("section");
    interfaceGroup.id = "abi-section-interface";
    interfaceGroup.className = "abi-settings-group";
    interfaceGroup.setAttribute("aria-labelledby", "abi-settings-interface-title");

    const siteRow = makeSettingsToggle(
      "abi-settings-site",
      "site",
      "Site modifications",
      "Enable custom overview stats board, responsive layout, tab navigation, and verdict dialogs.",
      "site interface responsive layout tabs stats board navigation",
      null,
      showToast,
    );
    const skipIntroRow = makeSettingsToggle(
      "abi-settings-skip-intro",
      "skipIntro",
      "Skip intro screen on load",
      "Directly enter the inspection workbench/overview when logged in without clicking Start Inspection.",
      "intro skip start inspection login bypass enter screen",
      null,
      showToast,
    );

    const interfaceHead = makeSectionHeading("Interface", async () => {
      const interfaceDefaults = { site: true, skipIntro: true };
      await safeStorageSet(interfaceDefaults);
      panel.querySelector("#abi-settings-site").checked = true;
      panel.querySelector("#abi-settings-skip-intro").checked = true;
      updateDependencies(panel);
      updateSettingsStatus(panel, await safeStorageGet(settingsDefaults));
      showToast("Interface reset ✓");
    });
    interfaceHead.querySelector("h2").id = "abi-settings-interface-title";

    interfaceGroup.append(interfaceHead, siteRow, skipIntroRow);

    // 3. Verdicts Card
    const verdictsGroup = document.createElement("section");
    verdictsGroup.id = "abi-section-verdicts";
    verdictsGroup.className = "abi-settings-group";
    verdictsGroup.setAttribute("aria-labelledby", "abi-settings-verdicts-title");

    const verdictEnhancementsRow = makeSettingsToggle(
      "abi-settings-verdict-enhancements",
      "verdictEnhancements",
      "Verdict dialog enhancements",
      "Violation quick-tag reason chips, localized placeholders, character counters (x / 50), and 3-category limit badge.",
      "verdict dialog violation counter placeholder english modal chips tags quick reason",
      null,
      showToast,
    );

    const verdictHotkeysRow = makeSettingsToggle(
      "abi-settings-verdict-hotkeys",
      "verdictHotkeys",
      "Quick verdict hotkeys",
      "Press keyboard shortcuts on the inspection workbench to instantly submit your verdict.",
      "hotkey hotkeys key shortcut verdict 1 2 3 g u i instant submit",
      makeKeyChips([
        "<kbd>1</kbd> or <kbd>G</kbd> Violation",
        "<kbd>2</kbd> or <kbd>U</kbd> Uncertain",
        "<kbd>3</kbd> or <kbd>I</kbd> No Violation",
      ]),
      showToast,
    );

    const notesRow = makeSettingsToggle(
      "abi-settings-notes",
      "inspectionNotes",
      "Enhanced inspection notice",
      "Use the enhanced, concise notice. Turn off to restore original site wording.",
      "notice notes warning inspection banner rule text",
      null,
      showToast,
    );

    const colorKeyRow = makeSettingsToggle(
      "abi-settings-color-key",
      "colorKey",
      "Role & distance color key",
      "Color-code markers for teammates (green), enemies (amber), and scavs/bots (blue).",
      "color key role distance teammate enemy scav bot marker",
      null,
      showToast,
    );

    const verdictsHead = makeSectionHeading("Verdicts", async () => {
      const verdictsDefaults = {
        verdictEnhancements: true,
        verdictHotkeys: false,
        inspectionNotes: true,
        colorKey: true,
      };
      await safeStorageSet(verdictsDefaults);
      panel.querySelector("#abi-settings-verdict-enhancements").checked = true;
      panel.querySelector("#abi-settings-verdict-hotkeys").checked = false;
      panel.querySelector("#abi-settings-notes").checked = true;
      panel.querySelector("#abi-settings-color-key").checked = true;
      updateDependencies(panel);
      updateSettingsStatus(panel, await safeStorageGet(settingsDefaults));
      showToast("Verdicts reset ✓");
    });
    verdictsHead.querySelector("h2").id = "abi-settings-verdicts-title";

    verdictsGroup.append(verdictsHead, verdictEnhancementsRow, verdictHotkeysRow, notesRow, colorKeyRow);

    // 4. Privacy Card
    const privacyGroup = document.createElement("section");
    privacyGroup.id = "abi-section-privacy";
    privacyGroup.className = "abi-settings-group";
    privacyGroup.setAttribute("aria-labelledby", "abi-settings-privacy-title");

    const privacyRow = document.createElement("label");
    privacyRow.className = "abi-settings-toggle";
    privacyRow.htmlFor = "abi-settings-privacy";
    privacyRow.dataset.keywords = "privacy streamer anonymize mask hide name id xp stream screenshot";

    const privacyCopy = document.createElement("span");
    privacyCopy.className = "abi-settings-copy";
    const privacyStrong = document.createElement("strong");
    privacyStrong.textContent = "Streamer / Privacy mode";
    const privacyHelp = document.createElement("small");
    privacyHelp.textContent = "Anonymize player name, ID, rank XP, and sensitive inspection data for streams or screenshots.";

    const privacyPreview = document.createElement("div");
    privacyPreview.className = "abi-privacy-preview-box";
    const previewTitle = document.createElement("div");
    previewTitle.className = "abi-privacy-preview-title";
    previewTitle.textContent = "Live Preview";
    const previewLine = document.createElement("div");
    previewLine.className = "abi-privacy-preview-line";
    const previewOrig = document.createElement("span");
    previewOrig.className = "abi-privacy-preview-orig";
    previewOrig.textContent = "Player123 (ID: 98412850)";
    const previewArrow = document.createElement("span");
    previewArrow.className = "abi-privacy-preview-arrow";
    previewArrow.textContent = "→";
    const previewMasked = document.createElement("span");
    previewMasked.className = "abi-privacy-preview-masked";
    previewMasked.textContent = "Player••• (ID: ••••••••)";
    previewLine.append(previewOrig, previewArrow, previewMasked);
    privacyPreview.append(previewTitle, previewLine);

    privacyCopy.append(privacyStrong, privacyHelp, privacyPreview);

    const privacyInput = document.createElement("input");
    privacyInput.id = "abi-settings-privacy";
    privacyInput.type = "checkbox";
    privacyInput.className = "abi-settings-checkbox";
    privacyInput.checked = privacyAnonymized;

    const privacySwitch = document.createElement("span");
    privacySwitch.className = "abi-settings-switch";
    privacySwitch.setAttribute("aria-hidden", "true");

    const updatePrivacyPreviewState = (active) => {
      previewMasked.classList.toggle("highlight", active);
    };
    updatePrivacyPreviewState(privacyAnonymized);

    privacyInput.addEventListener("change", () => {
      privacyAnonymized = privacyInput.checked;
      try {
        localStorage.setItem(privacyStorageKey, String(privacyAnonymized));
      } catch {}
      updatePrivacyPreviewState(privacyAnonymized);
      scheduleUpdate();
      showToast("Saved ✓");
    });

    privacyRow.append(privacyCopy, privacyInput, privacySwitch);

    const privacyHead = makeSectionHeading("Privacy", () => {
      privacyAnonymized = false;
      try {
        localStorage.setItem(privacyStorageKey, "false");
      } catch {}
      privacyInput.checked = false;
      updatePrivacyPreviewState(false);
      scheduleUpdate();
      showToast("Privacy reset ✓");
    });
    privacyHead.querySelector("h2").id = "abi-settings-privacy-title";

    privacyGroup.append(privacyHead, privacyRow);

    // 5. About & System Card
    const aboutGroup = document.createElement("section");
    aboutGroup.id = "abi-section-about";
    aboutGroup.className = "abi-settings-group abi-settings-about";
    aboutGroup.setAttribute("aria-labelledby", "abi-settings-about-title");

    const aboutHead = makeSectionHeading("About & System");
    aboutHead.querySelector("h2").id = "abi-settings-about-title";

    const aboutInfo = document.createElement("div");
    aboutInfo.className = "abi-settings-about-line";
    aboutInfo.dataset.keywords = "about version system name";
    const aboutCopy = document.createElement("p");
    aboutCopy.textContent = "ABI Inspector Extended";
    const badgesWrap = document.createElement("div");
    badgesWrap.className = "abi-settings-badges";
    const aboutVersion = document.createElement("span");
    aboutVersion.className = "abi-settings-version";
    aboutVersion.textContent = `v${getExtensionVersion()}`;
    const statusBadge = document.createElement("span");
    statusBadge.className = "abi-settings-status-badge";
    statusBadge.textContent = "Active";
    badgesWrap.append(aboutVersion, statusBadge);
    aboutInfo.append(aboutCopy, badgesWrap);

    const actionsRow = document.createElement("div");
    actionsRow.className = "abi-settings-actions-row";
    actionsRow.dataset.keywords = "restore defaults reload reset";

    const resetBtn = document.createElement("button");
    resetBtn.type = "button";
    resetBtn.className = "abi-settings-btn abi-settings-btn-neutral";
    resetBtn.textContent = "Restore Defaults";
    resetBtn.addEventListener("click", async () => {
      await safeStorageSet(settingsDefaults);
      privacyAnonymized = false;
      try {
        localStorage.setItem(privacyStorageKey, "false");
      } catch {}
      const setCheck = (selector, val) => {
        const el = panel.querySelector(selector);
        if (el) el.checked = val;
      };
      setCheck("#abi-settings-controls", true);
      setCheck("#abi-settings-autoplay", true);
      setCheck("#abi-settings-loop", false);
      setCheck("#abi-settings-site", true);
      setCheck("#abi-settings-skip-intro", true);
      setCheck("#abi-settings-privacy", false);
      setCheck("#abi-settings-verdict-enhancements", true);
      setCheck("#abi-settings-verdict-hotkeys", false);
      setCheck("#abi-settings-notes", true);
      setCheck("#abi-settings-color-key", true);
      updatePrivacyPreviewState(false);
      updateDependencies(panel);
      volumeSlider.value = "100";
      volumeOutput.value = "100%";
      volumeSlider.style.setProperty("--abi-volume-fill", "100%");
      syncVolumeChips(100);
      speedOutput.textContent = "1×";
      speedPresets.querySelectorAll(".abi-speed-chip").forEach((c) => c.classList.toggle("active", c.dataset.speed === "1"));
      updateSettingsStatus(panel, await safeStorageGet(settingsDefaults));
      scheduleUpdate();
      showToast("All defaults restored ✓");
      const prevText = resetBtn.textContent;
      resetBtn.textContent = "Defaults restored ✓";
      resetBtn.disabled = true;
      setTimeout(() => {
        resetBtn.textContent = prevText;
        resetBtn.disabled = false;
      }, 1500);
    });

    const reloadBtn = document.createElement("button");
    reloadBtn.type = "button";
    reloadBtn.className = "abi-settings-btn abi-settings-btn-accent abi-settings-reload-btn";
    reloadBtn.textContent = "Reload page to apply";
    reloadBtn.hidden = true;
    reloadBtn.addEventListener("click", () => location.reload());

    actionsRow.append(resetBtn, reloadBtn);

    const creditsRow = document.createElement("div");
    creditsRow.className = "abi-settings-credits";
    creditsRow.dataset.keywords = "credits author deem mkornela";
    const creditsText = document.createElement("span");
    creditsText.textContent = "Local preferences for Arena Breakout: Infinite inspection workbench. ";
    const creditsAuthor = document.createElement("span");
    creditsAuthor.className = "abi-settings-author";
    creditsAuthor.innerHTML = 'Made by <a href="https://github.com/mkornela" target="_blank" rel="noopener noreferrer">deem</a>';
    creditsRow.append(creditsText, creditsAuthor);

    aboutGroup.append(aboutHead, aboutInfo, actionsRow, creditsRow);

    // Assemble Content Column
    body.append(playback, interfaceGroup, verdictsGroup, privacyGroup, aboutGroup);
    layout.append(nav, body);
    panel.append(topbar, layout);

    // Live Search Filter Handler
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.toLowerCase().trim();
      searchClear.hidden = !q;
      let visibleCardsCount = 0;

      for (const card of [playback, interfaceGroup, verdictsGroup, privacyGroup, aboutGroup]) {
        let visibleInCard = 0;
        const rows = card.querySelectorAll(".abi-settings-toggle, .abi-settings-volume, .abi-settings-speed, .abi-settings-about-line, .abi-settings-actions-row, .abi-settings-credits");
        rows.forEach((row) => {
          if (!q) {
            row.hidden = false;
            visibleInCard++;
          } else {
            const text = (row.textContent + " " + (row.dataset.keywords || "")).toLowerCase();
            const matches = text.includes(q);
            row.hidden = !matches;
            if (matches) visibleInCard++;
          }
        });

        if (!q) {
          card.hidden = false;
          visibleCardsCount++;
        } else {
          card.hidden = visibleInCard === 0;
          if (visibleInCard > 0) visibleCardsCount++;
        }
      }

      emptyState.hidden = visibleCardsCount > 0;
    });

    searchClear.addEventListener("click", () => {
      searchInput.value = "";
      searchInput.dispatchEvent(new Event("input"));
      searchInput.focus();
    });

    // ScrollSpy with IntersectionObserver
    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              nav.querySelectorAll(".abi-settings-nav-btn").forEach((b) => {
                b.classList.toggle("active", b.dataset.target === `#${id}`);
              });
            }
          }
        },
        { root: panel, rootMargin: "-10% 0px -70% 0px", threshold: 0 }
      );

      observer.observe(playback);
      observer.observe(interfaceGroup);
      observer.observe(verdictsGroup);
      observer.observe(privacyGroup);
      observer.observe(aboutGroup);
    }

    // Populate initial state from storage
    safeStorageGet(settingsDefaults).then((settings) => {
      const current = settings || settingsDefaults;
      const setCheck = (selector, val) => {
        const el = panel.querySelector(selector);
        if (el) el.checked = Boolean(val);
      };
      setCheck("#abi-settings-controls", current.controls);
      setCheck("#abi-settings-autoplay", current.autoPlay);
      setCheck("#abi-settings-loop", current.loopVideo);
      setCheck("#abi-settings-site", current.site);
      setCheck("#abi-settings-skip-intro", current.skipIntro !== false);
      setCheck("#abi-settings-privacy", privacyAnonymized);
      setCheck("#abi-settings-verdict-enhancements", current.verdictEnhancements);
      setCheck("#abi-settings-verdict-hotkeys", current.verdictHotkeys);
      setCheck("#abi-settings-notes", current.inspectionNotes);
      setCheck("#abi-settings-color-key", current.colorKey);

      const vol = current.playerVolume ?? 100;
      volumeSlider.value = String(vol);
      volumeOutput.value = `${vol}%`;
      volumeSlider.style.setProperty("--abi-volume-fill", `${vol}%`);
      syncVolumeChips(vol);

      const currentSpeed = Number(current.playbackSpeed) || 1;
      speedOutput.textContent = `${currentSpeed}×`;
      speedPresets.querySelectorAll(".abi-speed-chip").forEach((c) => {
        c.classList.toggle("active", Math.abs(Number(c.dataset.speed) - currentSpeed) < 0.01);
      });

      updateDependencies(panel);
      updateSettingsStatus(panel, current);
    });

    return panel;
  }

  function updateDependencies(panel) {
    const siteInput = panel.querySelector("#abi-settings-site");
    const skipIntroRow = panel.querySelector('label[for="abi-settings-skip-intro"]');
    const skipIntroInput = panel.querySelector("#abi-settings-skip-intro");
    if (siteInput && skipIntroRow && skipIntroInput) {
      const siteEnabled = siteInput.checked;
      skipIntroInput.disabled = !siteEnabled;
      skipIntroRow.classList.toggle("disabled", !siteEnabled);
      skipIntroRow.setAttribute("aria-disabled", String(!siteEnabled));
    }

    const enhancementsInput = panel.querySelector("#abi-settings-verdict-enhancements");
    const verdictHotkeysRow = panel.querySelector('label[for="abi-settings-verdict-hotkeys"]');
    const verdictHotkeysInput = panel.querySelector("#abi-settings-verdict-hotkeys");
    if (enhancementsInput && verdictHotkeysRow && verdictHotkeysInput) {
      const enhancementsEnabled = enhancementsInput.checked;
      verdictHotkeysInput.disabled = !enhancementsEnabled;
      verdictHotkeysRow.classList.toggle("disabled", !enhancementsEnabled);
      verdictHotkeysRow.setAttribute("aria-disabled", String(!enhancementsEnabled));
    }
  }

  function makeSettingsToggle(id, key, title, description, keywords = "", chips = null, onSaved = null) {
    const row = document.createElement("label");
    row.className = "abi-settings-toggle";
    row.htmlFor = id;
    if (keywords) row.dataset.keywords = keywords;

    const copy = document.createElement("span");
    copy.className = "abi-settings-copy";
    const strong = document.createElement("strong");
    strong.textContent = title;
    const help = document.createElement("small");
    help.textContent = description;
    copy.append(strong, help);
    if (chips) copy.append(chips);

    const input = document.createElement("input");
    input.id = id;
    input.type = "checkbox";
    input.className = "abi-settings-checkbox";
    const switchVisual = document.createElement("span");
    switchVisual.className = "abi-settings-switch";
    switchVisual.setAttribute("aria-hidden", "true");

    input.addEventListener("change", async () => {
      await safeStorageSet({ [key]: input.checked });
      if (typeof onSaved === "function") onSaved("Saved ✓");
      const panel = input.closest(".abi-extension-settings");
      if (panel) {
        updateDependencies(panel);
        updateSettingsStatus(panel, await safeStorageGet(settingsDefaults));
      }
    });

    row.append(copy, input, switchVisual);
    return row;
  }

  function updateSettingsStatus(panel, settings) {
    const loaded = root.dataset.abiControlsLoaded;
    const wanted = settings.controls ? "on" : "off";
    const needsReload = Boolean(loaded && loaded !== wanted);
    const reload = panel.querySelector(".abi-settings-reload-btn, .abi-settings-reload");
    if (reload) reload.hidden = !needsReload;
  }

  function configureSettingsNavigation(nav, brand) {
    if (!nav.dataset.abiSettingsBound) {
      nav.dataset.abiSettingsBound = "true";
      nav.addEventListener("click", (event) => {
        const item = event.target.closest("li");
        if (!item || item.parentElement !== nav) return;
        if (item.classList.contains("abi-extension-brand")) {
          event.preventDefault();
          event.stopImmediatePropagation();
          if (settingsViewState) deactivateSettings(nav);
          else activateSettings(nav, item);
        } else if (settingsViewState) {
          deactivateSettings(nav);
        }
      }, true);
      nav.addEventListener("keydown", (event) => {
        const item = event.target.closest("li.abi-extension-brand");
        if (!item || item.parentElement !== nav || !["Enter", " "].includes(event.key)) return;
        event.preventDefault();
        if (settingsViewState) deactivateSettings(nav);
        else activateSettings(nav, item);
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && settingsViewState) {
          deactivateSettings(document.querySelector(".main .nav"));
        }
      });
    }
    if (brand) {
      brand.setAttribute("aria-pressed", settingsViewState ? "true" : "false");
      brand.classList.toggle("current", Boolean(settingsViewState));
    }
  }

  function activateSettings(nav, brand) {
    const main = nav.closest(".main");
    if (!main) return;
    const panel = main.querySelector(":scope > .abi-extension-settings") || createSettingsPanel();
    if (!panel.isConnected) main.append(panel);
    const pages = [...main.children].filter((child) =>
      child !== nav &&
      !child.matches(".exit_btn2, .abi-extension-settings, .abi-rank-dialog"),
    );
    settingsViewState = {
      nav,
      brand,
      currentItem: nav.querySelector(":scope > li.current"),
      pages: pages.map((element) => ({
        element,
        hidden: element.hidden,
        display: element.style.getPropertyValue("display"),
        displayPriority: element.style.getPropertyPriority("display"),
      })),
    };
    for (const { element } of settingsViewState.pages) {
      element.style.setProperty("display", "none", "important");
    }
    settingsViewState.currentItem?.classList.remove("current");
    brand.classList.add("current");
    brand.setAttribute("aria-pressed", "true");
    panel.hidden = false;
  }

  function deactivateSettings(nav) {
    if (!settingsViewState) return;
    const state = settingsViewState;
    settingsViewState = null;
    const panel = state.nav.closest(".main")?.querySelector(":scope > .abi-extension-settings");
    if (panel) panel.hidden = true;
    for (const { element, hidden, display, displayPriority } of state.pages) {
      if (display) element.style.setProperty("display", display, displayPriority);
      else element.style.removeProperty("display");
      element.hidden = hidden;
    }
    state.brand.classList.remove("current");
    state.brand.setAttribute("aria-pressed", "false");
    state.currentItem?.classList.add("current");
    if (nav && nav !== state.nav) nav.querySelector(":scope > .abi-extension-brand")?.setAttribute("aria-pressed", "false");
  }

  function place(parent, node) {
    if (parent && node && node.parentElement !== parent) parent.append(node);
  }

  function setProgress(fill, percentage) {
    if (typeof window !== "undefined" && window.setProgress && window.setProgress !== setProgress) {
      window.setProgress(fill, percentage);
      return;
    }
    const target = `${Math.max(0, Math.min(percentage, 100))}%`;
    fill.dataset.abiProgressTarget = target;
    if (!fill.dataset.abiProgressReady) {
      fill.dataset.abiProgressReady = "true";
      fill.style.width = "0%";
      requestAnimationFrame(() => {
        if (fill.isConnected) fill.style.width = fill.dataset.abiProgressTarget;
      });
      return;
    }
    fill.style.width = target;
  }

  function updateText(node, value) {
    if (node && node.textContent !== value) node.textContent = value;
  }

  function updateHeaderSlot(nav) {
    const main = nav.closest(".main");
    if (!main) return;
    const style = getComputedStyle(nav);
    const innerWidth =
      nav.clientWidth -
      Number.parseFloat(style.paddingLeft) -
      Number.parseFloat(style.paddingRight);
    const gap = Number.parseFloat(style.columnGap) || 0;
    const slot = (innerWidth - gap * 5) / 6;
    if (Number.isFinite(slot) && slot > 0) {
      main.style.setProperty("--abi-header-slot", `${slot}px`);
    }
  }

  function updateColorKey(enabled) {
    const currentLang = getCurrentLang();
    const colorLabels = [
      ["teammate", t("teammates") || "Teammates"],
      ["enemy", t("enemies") || "Enemies"],
      ["scav", t("scavs") || "Scavs (bots)"],
    ];

    const makeOrUpdateColorKey = (note) => {
      note.dataset.abiLang = currentLang;
      const rows = note.querySelectorAll(".abi-color-row");
      if (rows.length === colorLabels.length) {
        for (let i = 0; i < colorLabels.length; i++) {
          const [kind, label] = colorLabels[i];
          const row = rows[i];
          row.dataset.kind = kind;
          const name = row.querySelector(".abi-color-name");
          if (name && name.textContent !== label) name.textContent = label;
        }
        return;
      }
      const fragment = document.createDocumentFragment();
      for (const [kind, label] of colorLabels) {
        const row = document.createElement("span");
        row.className = "abi-color-row";
        row.dataset.kind = kind;
        const swatch = document.createElement("span");
        swatch.className = "abi-color-swatch";
        swatch.setAttribute("aria-hidden", "true");
        const name = document.createElement("span");
        name.className = "abi-color-name";
        name.textContent = label;
        row.append(swatch, name);
        fragment.append(row);
      }
      note.replaceChildren(fragment);
    };

    for (const note of document.querySelectorAll(
      "#xcWorking .tips-content #p46_2",
    )) {
      if (!enabled) {
        if (note.classList.contains("abi-color-key")) {
          note.replaceChildren(note.dataset.abiOriginalText || "");
          note.classList.remove("abi-color-key");
          delete note.dataset.abiOriginalText;
          delete note.dataset.abiLang;
        }
        continue;
      }

      if (note.classList.contains("abi-color-key")) {
        if (note.dataset.abiLang !== currentLang) {
          makeOrUpdateColorKey(note);
        }
        continue;
      }
      note.dataset.abiOriginalText = note.textContent;
      note.classList.add("abi-color-key");
      makeOrUpdateColorKey(note);
    }

    for (const panel of document.querySelectorAll(
      ".content.video:has(#drillButton)",
    )) {
      const practiceNote = findTestCaseNote(panel, "practice");
      let colorKey = panel.querySelector(".abi-test-color-key");
      if (!enabled) {
        colorKey?.remove();
        continue;
      }
      if (!colorKey) {
        colorKey = document.createElement("p");
        colorKey.className = "abi-color-key abi-test-color-key";
        colorKey.setAttribute("aria-label", "Inspection color key");
        panel.querySelector(".tips-content")?.append(colorKey);
      }
      if (colorKey.childElementCount === 0 || colorKey.dataset.abiLang !== currentLang) {
        makeOrUpdateColorKey(colorKey);
      }
    }
  }

  function findTestCaseNote(panel, kind) {
    const id = kind === "practice" ? "p75_2" : "p75_1";
    const byId = panel.querySelector(`.tips-content #${id}`);
    if (byId) return byId;
    const pattern =
      kind === "practice"
        ? /practice cases|predetermined outcomes|Übungsf|тренировочн|entraînement|prácticos|練習|treino|演練|演练/i
        : /distance markers|color-coding|Entfernungsmarkierungen|Маркеры расстояния|marqueurs de distance|marcadores de distancia|距離マーク|距離標記|距离标记/i;
    const content = panel.querySelector(".tips-content");
    const paragraphs = content ? [...content.querySelectorAll("p, li")] : [];
    const candidates = paragraphs.length ? paragraphs : [...(content?.children || [])];
    return candidates.find((note) => pattern.test(note.textContent)) || null;
  }

  function updateDrillCounters(enabled) {
    for (const video of document.querySelectorAll(
      ":is(.box.drill, #wxDrill) .content.video, .content.video:has(#drillButton)",
    )) {
      const userInfo = video.querySelector(".user-info");
      let drillCard = video.querySelector(".abi-drill-card");
      const drillDataList = video.querySelectorAll(".drill-data");

      if (!enabled) {
        if (drillCard) {
          if (userInfo) {
            for (const item of drillDataList) {
              userInfo.appendChild(item);
            }
          }
          drillCard.remove();
        }
        for (const item of drillDataList) {
          const span = item.querySelector("span");
          if (span && span.dataset.abiOriginalText !== undefined) {
            span.textContent = span.dataset.abiOriginalText;
            delete span.dataset.abiOriginalText;
          }
        }
        continue;
      }

      for (const item of drillDataList) {
        const span = item.querySelector("span");
        if (!span) continue;
        if (span.dataset.abiOriginalText === undefined) {
          span.dataset.abiOriginalText = span.textContent;
        }
        const label = span.classList.contains("str140")
          ? (t("inspectionsLabel") || "Inspections")
          : span.classList.contains("str141")
            ? (t("validLabel") || "Valid")
            : null;
        if (label && span.textContent !== label) span.textContent = label;
      }

      const expectedDrillTitle = t("practiceCases") || "Practice Cases";
      if (!drillCard) {
        drillCard = document.createElement("div");
        drillCard.className = "abi-drill-card";
        const header = document.createElement("div");
        header.className = "abi-status-header";
        const title = document.createElement("div");
        title.className = "abi-status-title";
        title.textContent = expectedDrillTitle;
        header.appendChild(title);
        drillCard.appendChild(header);

        const grid = document.createElement("div");
        grid.className = "abi-drill-grid";
        for (const item of drillDataList) {
          grid.appendChild(item);
        }
        drillCard.appendChild(grid);

        if (userInfo) {
          userInfo.after(drillCard);
        } else {
          video.prepend(drillCard);
        }
      } else {
        const title = drillCard.querySelector(".abi-status-title");
        if (title && title.textContent !== expectedDrillTitle) {
          title.textContent = expectedDrillTitle;
        }
        if (userInfo && userInfo.nextElementSibling !== drillCard) {
          userInfo.after(drillCard);
        }
        let grid = drillCard.querySelector(".abi-drill-grid");
        if (!grid) {
          grid = document.createElement("div");
          grid.className = "abi-drill-grid";
          drillCard.appendChild(grid);
        }
        for (const item of drillDataList) {
          if (item.parentElement !== grid) grid.appendChild(item);
        }
      }
    }
  }

  function updateWorkbenchStatus(enabled) {
    for (const rogue of document.querySelectorAll(
      ".box.drill .abi-status-card, #wxDrill .abi-status-card, .content.video:has(#drillButton) .abi-status-card",
    )) {
      rogue.remove();
    }

    for (const video of document.querySelectorAll(
      "#xcWorking > .content.video, #xcWorking.content.video",
    )) {
      const userInfo = video.querySelector(".user-info");
      const status = video.querySelector(".user-status");
      let card = video.querySelector(".abi-status-card");

      if (!enabled) {
        card?.remove();
        if (status) status.style.display = "";
        const span = status?.querySelector(".str73");
        if (span) span.style.display = "";
        const strong = status?.querySelector("#dayTotalJudgedNum, strong");
        if (strong) strong.style.display = "";
        continue;
      }

      const countEl = status?.querySelector("#dayTotalJudgedNum, strong") || video.querySelector("#dayTotalJudgedNum");
      const domText = countEl?.textContent?.trim();
      const domCount = domText !== "" && domText !== undefined ? parseInt(domText, 10) : NaN;
      const summaryCount = window.__abiOverviewData?.userJudgeSummary?.day_judged_num;
      
      // Prefer live DOM count if valid; otherwise fallback to summaryCount.
      let count = Number.isFinite(domCount) ? domCount : (summaryCount !== undefined ? Number(summaryCount) : 0);
      if (summaryCount !== undefined && Number.isFinite(domCount)) {
        count = Math.max(domCount, Number(summaryCount));
      }
      
      // Keep overview data in sync with live count on workbench
      if (window.__abiOverviewData?.userJudgeSummary && Number.isFinite(count) && count > (window.__abiOverviewData.userJudgeSummary.day_judged_num || 0)) {
        window.__abiOverviewData.userJudgeSummary.day_judged_num = count;
      }

      const max = Number(window.__abiOverviewData?.userJudgeSummary?.day_permit_num) || 20;
      const remaining = Math.max(0, max - count);
      const percent = Math.min(100, Math.max(0, (count / max) * 100));

      if (status) status.style.setProperty("display", "none", "important");

      if (!card) {
        card = document.createElement("div");
        card.className = "abi-status-card";
        if (userInfo) {
          userInfo.after(card);
        } else if (status) {
          status.after(card);
        }
      } else if (userInfo && userInfo.nextElementSibling !== card) {
        userInfo.after(card);
      }

      const titleEl = card.querySelector(".abi-status-title");
      const numEl = card.querySelector(".abi-status-num");
      const slashEl = card.querySelector(".abi-status-slash");
      const fillEl = card.querySelector(".abi-status-fill");
      const remEl = card.querySelector(".abi-status-remaining");
      const trackEl = card.querySelector(".abi-status-track");
      const expectedTitle = t("inspectedToday") || "Inspected Today";
      const expectedRem = formatCasesRemainingToday(remaining);

      if (titleEl && numEl && slashEl && fillEl && remEl && trackEl) {
        if (titleEl.textContent !== expectedTitle) titleEl.textContent = expectedTitle;
        if (numEl.textContent !== String(count)) numEl.textContent = String(count);
        if (slashEl.textContent !== ` / ${max}`) slashEl.textContent = ` / ${max}`;
        if (fillEl.style.width !== `${percent}%`) fillEl.style.width = `${percent}%`;
        if (remEl.textContent !== expectedRem) remEl.textContent = expectedRem;
        trackEl.setAttribute("aria-valuenow", String(count));
        trackEl.setAttribute("aria-valuemax", String(max));
      } else {
        card.innerHTML = `
          <div class="abi-status-header">
            <div class="abi-status-title">${expectedTitle}</div>
            <div class="abi-status-count"><strong class="abi-status-num">${count}</strong><span class="abi-status-slash"> / ${max}</span></div>
          </div>
          <div class="abi-status-track" role="progressbar" aria-valuenow="${count}" aria-valuemin="0" aria-valuemax="${max}">
            <div class="abi-status-fill" style="width: ${percent}%;"></div>
          </div>
          <div class="abi-status-remaining">${expectedRem}</div>
        `;
      }
    }
  }

  function updateInspectorProfile(enabled) {
    for (const userid of document.querySelectorAll(
      ":is(#xcWorking, .content.video) .userid",
    )) {
      let copyBtn = userid.querySelector(".abi-copy-id-btn");
      if (!enabled) {
        copyBtn?.remove();
        userid.style.width = "";
        userid.style.maxWidth = "";
        userid.style.overflow = "";
        continue;
      }

      userid.style.setProperty("width", "auto", "important");
      userid.style.setProperty("max-width", "100%", "important");
      userid.style.setProperty("overflow", "visible", "important");

      if (!copyBtn) {
        copyBtn = document.createElement("button");
        copyBtn.type = "button";
        copyBtn.className = "abi-copy-id-btn";
        copyBtn.title = "Copy User ID";
        copyBtn.setAttribute("aria-label", "Copy User ID");

        const copySvg = `<svg class="abi-copy-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`;
        const checkSvg = `<svg class="abi-copy-check" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#37cf88" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

        copyBtn.innerHTML = copySvg;

        copyBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const idSpan = userid.querySelector("[id^='roleOpenid']");
          const text = idSpan?.textContent?.trim() || "";
          if (!text) return;
          const setCopied = () => {
            copyBtn.innerHTML = checkSvg;
            copyBtn.classList.add("copied");
            setTimeout(() => {
              copyBtn.innerHTML = copySvg;
              copyBtn.classList.remove("copied");
            }, 1500);
          };
          if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(text).then(setCopied).catch(setCopied);
          } else {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.append(ta);
            ta.select();
            document.execCommand("copy");
            ta.remove();
            setCopied();
          }
        });
        userid.append(copyBtn);
      }
    }
  }

  function handleExitInspection(exitBtn) {
    window.dispatchEvent(new CustomEvent("abi:exit-inspection"));
    document.querySelectorAll("video").forEach((v) => {
      try { v.pause(); } catch {}
    });
    const overviewTab = document.querySelector(
      ".main .nav li:first-child, .main .nav li#mine, .main .nav [tabid='mine']",
    );
    if (overviewTab) {
      overviewTab.click();
    }
    const workingBoxes = document.querySelectorAll(
      "#working, #drill, .working, .drill, #xcWorking",
    );
    workingBoxes.forEach((box) => {
      const divs = box.querySelectorAll(":scope > div");
      if (divs.length > 1) {
        divs[0].style.display = "";
        for (let i = 1; i < divs.length; i++) divs[i].style.display = "none";
      }
    });
    if (exitBtn) {
      exitBtn.style.setProperty("display", "none", "important");
    }
  }

  function updateExitButton(enabled) {
    const exitBtn = document.querySelector(".exit_btn2");
    if (!exitBtn) return;

    if (!exitBtn.dataset.abiExitBound) {
      exitBtn.dataset.abiExitBound = "true";
      exitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleExitInspection(exitBtn);
      });
    }

    const nav = document.querySelector(".main .nav");
    if (!nav) return;

    if (!enabled) {
      exitBtn.style.setProperty("display", "none", "important");
      const operation = document.querySelector(
        ":is(#xcWorking, .content.video) .operation",
      );
      if (operation && exitBtn.parentElement === nav) {
        operation.append(exitBtn);
      }
      return;
    }

    const exitText = typeof t === "function" ? t("exitInspection") : "Exit Inspection";
    if (exitText && exitBtn.textContent.trim() !== exitText) {
      exitBtn.textContent = exitText;
    }
    exitBtn.setAttribute("aria-label", exitText);
    exitBtn.title = exitText;

    const activeTab = nav.querySelector("li.current");
    const isInspectionTab = Boolean(
      activeTab?.id === "working" ||
      activeTab?.id === "drill" ||
      activeTab?.classList.contains("str24") ||
      activeTab?.classList.contains("str26"),
    );

    if (exitBtn.parentElement !== nav) {
      nav.append(exitBtn);
    }
    if (isInspectionTab) {
      exitBtn.style.setProperty("display", "inline-flex", "important");
    } else {
      exitBtn.style.setProperty("display", "none", "important");
    }
  }

  function updateChallengeRewards(enabled) {
    const rewards = [...document.querySelectorAll("#wxPatrol .taks-gift > span")];
    for (const reward of rewards) {
      if (!enabled) {
        reward.classList.remove("abi-compact-reward");
        delete reward.dataset.abiRewardDisplay;
        if (reward.dataset.abiOriginalAriaLabel === "__none__") {
          reward.removeAttribute("aria-label");
        } else if (reward.dataset.abiOriginalAriaLabel !== undefined) {
          reward.setAttribute("aria-label", reward.dataset.abiOriginalAriaLabel);
        }
        delete reward.dataset.abiOriginalAriaLabel;
        continue;
      }

      const text = reward.textContent.trim();
      const amountMatch = text.match(/x\s*([\d,]+)\s*$/i);
      if (!amountMatch) continue;
      const amountText = amountMatch[1];
      const amount = Number(amountText?.replace(/,/g, ""));
      if (!Number.isFinite(amount) || amount <= 0) continue;
      const currency = reward.querySelector("em.str21, em.str169");
      const name = currency?.textContent.trim() ||
        text.slice(0, amountMatch.index).trim();
      if (!name) continue;
      const compact = (value) => value.toFixed(2).replace(/\.?0+$/, "");
      const label = /^(koen|coin)$/i.test(name)
        ? amount >= 1_000_000
          ? `${compact(amount / 1_000_000)}m ${name}`
          : amount >= 1_000
            ? `${compact(amount / 1_000)}k ${name}`
            : `${new Intl.NumberFormat("en").format(amount)} ${name}`
        : `${new Intl.NumberFormat("en").format(amount)} ${name}`;
      reward.dataset.abiRewardDisplay = label;
      reward.classList.add("abi-compact-reward");
      if (reward.dataset.abiOriginalAriaLabel === undefined) {
        reward.dataset.abiOriginalAriaLabel = reward.hasAttribute("aria-label")
          ? reward.getAttribute("aria-label")
          : "__none__";
      }
      reward.setAttribute("aria-label", label);
    }
  }

  function updateChallengeProgressLabels(enabled) {
    for (const row of document.querySelectorAll("#wxPatrol .taks-list > ul > li")) {
      const button = row.querySelector("a.taks-btn2");
      if (button?.dataset.abiProgressDisplay) {
        delete button.dataset.abiProgressDisplay;
      }
      const info = row.querySelector(".taks-info");
      const prog = row.querySelector(".task-progress");
      if (!enabled) {
        if (prog && info && prog.parentElement !== info) {
          info.appendChild(prog);
        }
        continue;
      }
      if (prog && info && prog.parentElement === info) {
        row.appendChild(prog);
      }
    }
  }

  function updateInspectionNote(enabled) {
    const currentLang = getCurrentLang();
    const data = INSPECTION_NOTE_DATA[currentLang] || INSPECTION_NOTE_DATA.en;
    const notes = new Set(
      document.querySelectorAll("#xcWorking .tips-content #p46_1"),
    );
    for (const panel of document.querySelectorAll(
      ".content.video:has(#drillButton)",
    )) {
      for (const kind of ["inspection", "practice"]) {
        const note = findTestCaseNote(panel, kind);
        if (note) notes.add(note);
      }
    }
    for (const note of notes) {
      if (!enabled) {
        if (note.classList.contains("abi-inspection-note") ||
            note.classList.contains("abi-practice-note")) {
          note.replaceChildren(note.dataset.abiOriginalText || "");
          note.classList.remove("abi-inspection-note", "abi-practice-note");
          delete note.dataset.abiOriginalText;
          delete note.dataset.abiLang;
        }
        continue;
      }
      if (note.dataset.abiOriginalText === undefined) {
        note.dataset.abiOriginalText = note.textContent;
      }
      const isPractice =
        note.id === "p75_2" ||
        /practice cases|predetermined outcomes|Übungsf|тренировочн|entraînement|prácticos|練習|treino|演練|演练/i.test(
          note.dataset.abiOriginalText || note.textContent,
        );
      if (isPractice) {
        if (!note.classList.contains("abi-practice-note")) note.classList.add("abi-practice-note");
        if (note.dataset.abiLang !== currentLang) {
          note.textContent = data.practice;
          note.dataset.abiLang = currentLang;
        }
        continue;
      }

      if (!note.classList.contains("abi-inspection-note")) note.classList.add("abi-inspection-note");
      if (note.dataset.abiLang === currentLang) continue;
      note.dataset.abiLang = currentLang;

      const fragment = document.createDocumentFragment();
      fragment.append(data.lead);
      const official = document.createElement("strong");
      official.textContent = data.strong1;
      fragment.append(official);
      fragment.append(data.mid);
      const notSuspect = document.createElement("strong");
      notSuspect.textContent = data.strong2;
      fragment.append(notSuspect);
      fragment.append(data.end);
      note.replaceChildren(fragment);
    }
  }

  function updateInspectionTitle(enabled) {
    for (const video of document.querySelectorAll(":is(#xcWorking, .content.video)")) {
      const title = video.querySelector(".tips-title");
      const content = video.querySelector(".tips-content");
      if (!title) continue;

      if (!enabled) {
        if (content && title.parentElement === content) {
          content.before(title);
        }
        if (title.dataset.abiOriginalText !== undefined) {
          title.textContent = title.dataset.abiOriginalText;
        }
        continue;
      }

      if (title.dataset.abiOriginalText === undefined) {
        title.dataset.abiOriginalText = title.textContent;
      }
      const label = video.querySelector("#drillButton")
        ? (t("officialInspectionNotes") || "Official Inspection Notes")
        : title.dataset.abiOriginalText.trim().replace(/\s*:?\s*$/, "");
      if (title.textContent !== label) title.textContent = label;

      if (content && title.parentElement !== content) {
        content.prepend(title);
      }
    }
  }

  function markGuidelinePhrase(node, phraseOrRegex, kind, explanation = "") {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const textNode = walker.currentNode;
      if (textNode.parentElement?.closest(".abi-guideline-mark")) continue;
      const text = textNode.nodeValue;
      let index = -1;
      let matchLen = 0;
      if (phraseOrRegex instanceof RegExp) {
        const match = text.match(phraseOrRegex);
        if (match && match.index !== undefined) {
          index = match.index;
          matchLen = match[0].length;
        }
      } else {
        index = text.toLowerCase().indexOf(phraseOrRegex.toLowerCase());
        matchLen = phraseOrRegex.length;
      }
      if (index < 0) continue;
      const wrapper = document.createElement(kind === "term" ? "abbr" : "strong");
      wrapper.className = `abi-guideline-mark abi-guideline-${kind}`;
      if (explanation) wrapper.title = explanation;
      wrapper.textContent = text.slice(index, index + matchLen);
      const fragment = document.createDocumentFragment();
      fragment.append(text.slice(0, index), wrapper, text.slice(index + matchLen));
      textNode.replaceWith(fragment);
      return;
    }
  }

  function updateGuidelines(enabled) {
    const content = document.querySelector(
      ".box.notice .notice-main .notice-content.str83",
    );
    if (!content) return;

    if (!enabled) {
      if (!content.classList.contains("abi-guidelines")) return;
      const mainHeading = content.querySelector(".abi-guideline-main-heading");
      const mainPanel = content.closest(".notice-main");
      if (mainHeading && mainPanel) {
        mainHeading.classList.remove("abi-guideline-main-heading");
        mainPanel.insertBefore(mainHeading, content);
      }
      content.innerHTML = content.dataset.abiOriginalHtml || "";
      delete content.dataset.abiOriginalHtml;
      delete content.dataset.abiLang;
      content.classList.remove("abi-guidelines");
      return;
    }
    const currentLang = getCurrentLang();
    const alreadyFormatted =
      content.classList.contains("abi-guidelines") &&
      content.dataset.abiLang === currentLang &&
      content.querySelector(".abi-guideline-list") !== null;
    if (alreadyFormatted) return;

    if (content.dataset.abiOriginalHtml === undefined) {
      content.dataset.abiOriginalHtml = content.innerHTML;
    }
    const mainHeading =
      content.querySelector(".abi-guideline-main-heading") ||
      content.closest(".notice-main")?.querySelector(":scope > h4");
    const originalRules = new Map(
      [...content.querySelectorAll("[id^='p83_']")].map((rule) => [rule.id, rule]),
    );
    const penaltyHeading = [...content.querySelectorAll("h5")].find((heading) =>
      /penalties for inspector violations|strafen für verstöße|меры наказания|sanctions en cas|sanciones por infracciones|ペナルティ|penalidades|懲罰規則|惩处规则/i.test(heading.textContent),
    );
    const getRule = (id, className, stripMarker = true) => {
      const rule = originalRules.get(id);
      if (!rule) return null;
      rule.textContent = rule.textContent.trim().replace(
        stripMarker ? /^(?:\d+\.|[a-z]\))\s*/i : /$^/,
        "",
      );
      rule.classList.add(...className.split(/\s+/));
      return rule;
    };
    const appendRule = (parent, id, className = "abi-guideline-item") => {
      const rule = getRule(id, className);
      if (rule) parent.append(rule);
      return rule;
    };

    content.replaceChildren();
    content.classList.add("abi-guidelines");
    if (mainHeading) {
      mainHeading.classList.add("abi-guideline-main-heading");
      content.append(mainHeading);
    }

    const conduct = document.createElement("div");
    conduct.className = "abi-guideline-list";
    conduct.setAttribute("role", "list");
    const p1 = appendRule(conduct, "p83_1");
    const p2 = appendRule(conduct, "p83_2");
    const subrules = document.createElement("div");
    subrules.className = "abi-guideline-sublist";
    subrules.setAttribute("role", "list");
    for (const id of ["p83_3", "p83_4", "p83_5"]) {
      appendRule(subrules, id, "abi-guideline-item abi-guideline-subitem");
    }
    conduct.append(subrules);
    const p6 = appendRule(conduct, "p83_6");
    const p7 = appendRule(conduct, "p83_7");
    content.append(conduct);

    if (penaltyHeading) {
      penaltyHeading.className = "abi-guideline-penalty-heading";
      content.append(penaltyHeading);
    }

    const penaltyIntro = getRule("p83_8", "abi-guideline-penalty-intro", false);
    if (penaltyIntro) content.append(penaltyIntro);
    const penalties = document.createElement("div");
    penalties.className = "abi-guideline-list abi-guideline-penalties";
    penalties.setAttribute("role", "list");
    const p9 = appendRule(penalties, "p83_9");
    const p10 = appendRule(penalties, "p83_10");
    const p11 = appendRule(penalties, "p83_11");
    content.append(penalties);

    for (const [node, phrase] of [
      [p1, "fair gaming environment"],
      [p2, "serious, responsible, objective, and fair manner"],
      [content.querySelector("#p83_3"), "Game Security Penalty Rules"],
      [content.querySelector("#p83_4"), "Do not lend your account"],
      [content.querySelector("#p83_5"), "official video inspection feature"],
      [p6, "do not represent the official stance"],
      [p7, "immediately revoked"],
      [penaltyIntro, "impact and severity"],
      [p9, "Revocation of video inspection status"],
      [p10, "Termination of any official collaborations"],
      [p11, "Legal action may be taken"],
    ]) {
      if (node) markGuidelinePhrase(node, phrase, "emphasis");
    }
    for (const [node, term, explanation] of [
      [content.querySelector("#p83_5"), "third-party videos", "Videos from sources outside the official inspection system."],
      [content.querySelector("#p83_5"), "blackmail", "Threats used to force someone to act."],
      [content.querySelector("#p83_5"), "defamation", "False statements that harm someone's reputation."],
      [p6, "affiliate relationship", "An official association with the company."],
      [p11, "consequences", "The results or effects of an action."],
    ]) {
      if (node) markGuidelinePhrase(node, term, "term", explanation);
    }
    content.dataset.abiLang = currentLang;
  }

  function updateFaq(enabled) {
    const content = document.querySelector(
      ".box.notice .notice-main .notice-content.str84.faq",
    );
    if (!content) return;

    if (!enabled) {
      if (!content.classList.contains("abi-faq")) return;
      const heading = content.querySelector(".abi-guideline-main-heading");
      const mainPanel = content.closest(".notice-main");
      if (heading && mainPanel) {
        heading.classList.remove("abi-guideline-main-heading");
        mainPanel.insertBefore(heading, content);
      }
      content.innerHTML = content.dataset.abiOriginalHtml || "";
      delete content.dataset.abiOriginalHtml;
      delete content.dataset.abiFaqLayout;
      delete content.dataset.abiLang;
      content.classList.remove("abi-faq");
      return;
    }
    const currentLang = getCurrentLang();
    const alreadyFormatted =
      content.classList.contains("abi-faq") &&
      content.dataset.abiFaqLayout === "routes-v3" &&
      content.dataset.abiLang === currentLang &&
      content.querySelector(".abi-faq-card") !== null;
    if (alreadyFormatted) return;

    if (content.dataset.abiOriginalHtml === undefined) {
      content.dataset.abiOriginalHtml = content.innerHTML;
    }
    const heading =
      content.querySelector(".abi-guideline-main-heading") ||
      content.closest(".notice-main")?.querySelector(":scope > h4");
    const entries = [...content.querySelectorAll("[id^='p84_']")].sort(
      (a, b) => Number(a.id.slice(4)) - Number(b.id.slice(4)),
    );
    const list = document.createElement("div");
    list.className = "abi-faq-list";
    list.setAttribute("role", "list");

    for (let index = 0; index < entries.length; index += 2) {
      const question = entries[index];
      let answer = entries[index + 1];
      if (!question || !answer) continue;

      const card = document.createElement("article");
      card.className = "abi-faq-card";
      card.setAttribute("role", "listitem");
      question.classList.add("abi-faq-question");
      answer.classList.add("abi-faq-answer");
      markGuidelinePhrase(question, /^(?:Q\s*[:：]|F\s*[:：]|В\s*[:：]|P\s*[:：]|问\s*[:：])/i, "faq-question-prefix");
      markGuidelinePhrase(answer, /^(?:A\s*[:：]|R\s*[:：]|О\s*[:：]|答\s*[:：])/i, "faq-answer-prefix");
      if (/Inspector Community via the following methods|Inspector-Community über die folgenden Methoden|сообщество инспекторов следующими способами|communauté des inspecteurs selon les méthodes suivantes|comunidad de inspectores mediante los siguientes métodos|以下の方法で検査官コミュニティ|comunidade de inspetores pelos seguintes métodos|巡查員社區|巡查员社区/i.test(answer.textContent) || (answer.textContent.includes("1)") && answer.textContent.includes("2)") && answer.textContent.includes("3)"))) {
        const source = answer.textContent.replace(/\s+/g, " ").trim();
        const markers = [...source.matchAll(/([123])\\?[)）\.]\s*/g)];
        const firstRoute = markers[0]?.index ?? -1;
        const secondRoute = markers[1]?.index ?? -1;
        const thirdRoute = markers[2]?.index ?? -1;
        const conclusionMatch = source
          .slice(markers[2] ? markers[2].index + markers[2][0].length : 0)
          .match(/\b(?:Once you(?:'|’)ve entered|Sobald du|После входа|Une fois|Una vez|検査官コミュニティに参加|Depois de entrar|進入巡查員社區後|进入巡查员社区后)\b/i);
        const conclusionStart = conclusionMatch
          ? markers[2].index + markers[2][0].length + conclusionMatch.index
          : source.length;
        if (firstRoute >= 0 && secondRoute > firstRoute && thirdRoute > secondRoute) {
          const routeStart = (marker) => marker.index + marker[0].length;
          const structuredAnswer = document.createElement("div");
          structuredAnswer.id = answer.id;
          structuredAnswer.className = "abi-faq-answer";

          const lead = document.createElement("p");
          lead.className = "abi-faq-answer-lead";
          const prefix = document.createElement("strong");
          prefix.className = "abi-guideline-mark abi-guideline-faq-answer-prefix";
          prefix.textContent = source.slice(0, 2).replace(/\s+/g, "");
          lead.append(prefix, ` ${source.slice(0, firstRoute).replace(/^(?:A\s*[:：]|R\s*[:：]|О\s*[:：]|答\s*[:：])\s*/i, "").trim()}`);

          const routes = document.createElement("ol");
          routes.className = "abi-faq-routes";
          const routeTexts = [
            source.slice(routeStart(markers[0]), secondRoute),
            source.slice(routeStart(markers[1]), thirdRoute),
            source.slice(routeStart(markers[2]), conclusionStart),
          ];
          for (const route of routeTexts) {
            const item = document.createElement("li");
            item.textContent = route.trim();
            routes.append(item);
          }

          const conclusion = document.createElement("p");
          conclusion.className = "abi-faq-route-conclusion";
          conclusion.textContent = source.slice(conclusionStart).trim();
          structuredAnswer.append(lead, routes, conclusion);
          answer.replaceWith(structuredAnswer);
          answer = structuredAnswer;
          entries[index + 1] = answer;
        }
      }
      card.append(question, answer);
      list.append(card);
    }

    const faqById = new Map(entries.map((entry) => [entry.id, entry]));
    for (const [id, phrase] of [
      ["p84_2", "excellent gaming record"],
      ["p84_4", "inspection practices"],
      ["p84_8", "Violation Found"],
      ["p84_8", "No Violation Found"],
      ["p84_12", "player searching, aiming, and firing"],
      ["p84_14", "correct verdict"],
      ["p84_16", "official team"],
      ["p84_18", "not an effect of cheating"],
      ["p84_20", "Teaming with Cheaters"],
      ["p84_24", "will be reset"],
      ["p84_26", "evaluated in real time"],
      ["p84_28", "limited-time item"],
      ["p84_30", "exclusive Inspector rewards"],
      ["p84_32", "revocation of Inspector status"],
      ["p84_34", "50 upgrade points"],
      ["p84_34", "250 upgrade points per day"],
    ]) {
      const node = faqById.get(id);
      if (node) markGuidelinePhrase(node, phrase, "emphasis");
    }
    for (const [id, term, explanation] of [
      ["p84_10", "Insufficient Evidence", "Choose this when the video does not provide enough information for a clear verdict."],
      ["p84_10", "Video Error", "Choose this when a technical problem prevents a fair review."],
      ["p84_20", "Teaming with Cheaters", "Players working together with cheaters to gain an unfair advantage."],
      ["p84_34", "upgrade points", "Points earned for accurate inspections that contribute to Inspector progression."],
    ]) {
      const node = faqById.get(id);
      if (node) markGuidelinePhrase(node, term, "term", explanation);
    }

    content.replaceChildren();
    content.classList.add("abi-faq");
    if (heading) {
      heading.classList.add("abi-guideline-main-heading");
      content.append(heading);
    }
    content.append(list);
    content.dataset.abiFaqLayout = "routes-v3";
    content.dataset.abiLang = currentLang;
  }

  function restoreRewards(dialog) {
    const table = document.querySelector("#wxMine .grade-popup table");
    if (!dialog || !table) return;
    const rows = [...table.querySelectorAll("tbody tr")];
    [...dialog.querySelectorAll(".abi-rank-card")].forEach((card, index) => {
      const cell = rows[index]?.children[4];
      if (!cell) return;
      const image = card.querySelector("img");
      const label = card.querySelector(".abi-rank-reward span");
      if (label?.dataset.abiOriginalReward !== undefined) {
        label.innerHTML = label.dataset.abiOriginalReward;
        delete label.dataset.abiOriginalReward;
      }
      if (label) {
        delete label.dataset.abiKoenAmount;
        label.removeAttribute("aria-label");
        label.classList.remove("abi-koen-amount");
      }
      image?.classList.remove("abi-koen-icon");
      if (image) cell.append(image);
      if (label) cell.append(label);
    });
  }

  function restoreOverview(profile) {
    if (!profile) return;
    const shell = profile.parentElement?.querySelector(":scope > .abi-overview");
    const dialog = document.querySelector("#wxMine > .abi-rank-dialog");
    restoreRewards(dialog);
    const copyBtn = shell?.querySelector(".abi-copy-id") || profile.querySelector(".abi-copy-id");
    copyBtn?.remove();
    const working = profile.querySelector("#gotoWorking");
    for (const selector of [
      ".avatar",
      ".username",
      ".userid",
      ".honor",
      ".abi-rank-progress",
      ".grade",
    ]) {
      const node = shell?.querySelector(selector);
      if (!node) continue;
      if (working) profile.insertBefore(node, working);
      else profile.append(node);
    }
    shell?.remove();
    profile.parentElement
      ?.querySelector(":scope > .abi-overview-cards")
      ?.remove();
    dialog?.remove();
  }

  function ensureDialog(host) {
    let dialog = host.querySelector(":scope > .abi-rank-dialog");
    if (dialog) return dialog;
    dialog = document.createElement("div");
    dialog.className = "abi-rank-dialog";
    dialog.hidden = true;

    const panel = document.createElement("div");
    panel.className = "abi-rank-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-labelledby", "abi-rank-title");

    const header = document.createElement("header");
    header.className = "abi-rank-head";
    const title = document.createElement("h2");
    title.id = "abi-rank-title";
    title.textContent = t("rankRules");
    const close = document.createElement("button");
    close.type = "button";
    close.className = "abi-rank-close";
    close.textContent = t("close");
    header.append(title, close);

    const list = document.createElement("div");
    list.className = "abi-rank-list";
    panel.append(header, list);
    dialog.append(panel);
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.hidden = true;
    });
    close.addEventListener("click", () => {
      dialog.hidden = true;
      host.querySelector(".abi-rank-open")?.focus();
    });
    host.append(dialog);
    return dialog;
  }

  function syncRankDialog(profile, levelText) {
    const host = document.querySelector("#wxMine") || profile.parentElement;
    const popup = profile.parentElement?.querySelector(".grade-popup");
    const table = popup?.querySelector("table");
    if (!host || !table) return;
    const dialog = ensureDialog(host);
    const title = dialog.querySelector("#abi-rank-title");
    if (title) updateText(title, t("rankRules"));
    const closeBtn = dialog.querySelector(".abi-rank-close");
    if (closeBtn) updateText(closeBtn, t("close"));

    const currentLang = (typeof getCurrentLang === "function" ? getCurrentLang() : "en").toLowerCase();
    const rows = [...table.querySelectorAll("tbody tr")];
    const list = dialog.querySelector(".abi-rank-list");
    rows.forEach((row, index) => {
      const cells = [...row.children];
      if (cells.length < 5) return;
      let card = list.children[index];
      if (!card) {
        card = document.createElement("article");
        card.className = "abi-rank-card";
        const main = document.createElement("div");
        main.className = "abi-rank-card-main";
        const name = document.createElement("h3");
        const detail = document.createElement("p");
        main.append(name, detail);
        const bonus = document.createElement("div");
        bonus.className = "abi-rank-bonus";
        const reward = document.createElement("div");
        reward.className = "abi-rank-reward";
        card.append(main, bonus, reward);
        list.append(card);
      }
      const rankTitle = cells[0].textContent.trim();
      const inspections = cells[1].textContent.trim();
      const accuracy = cells[2].textContent.trim();
      const bonusValue = cells[3].textContent.trim();
      updateText(card.querySelector("h3"), getLocalizedRankTitle(rankTitle, currentLang));
      const accuracyLabel =
        !accuracy || accuracy === "/" ? t("noAccuracyGate") : `${accuracy} ${t("recentAccuracy")}`;
      updateText(
        card.querySelector("p"),
        `${inspections} ${t("successfulInspections")} · ${accuracyLabel}`,
      );
      updateText(
        card.querySelector(".abi-rank-bonus"),
        !bonusValue || bonusValue === "/" ? "—" : `${bonusValue} ${t("bonusXp")}`,
      );
      const reward = card.querySelector(".abi-rank-reward");
      const image = cells[4].querySelector("img");
      const label = cells[4].querySelector("span");
      const koenLabel = label?.textContent.match(/Koen\s*x\s*([\d,]+)/i);
      if (koenLabel && label.dataset.abiOriginalReward === undefined) {
        label.dataset.abiOriginalReward = label.innerHTML;
        label.dataset.abiKoenAmount = koenLabel[1].replace(/,/g, "");
      }
      const koenAmount = Number(label?.dataset.abiKoenAmount);
      if (Number.isFinite(koenAmount) && koenAmount > 0) {
        const compactAmount =
          koenAmount >= 1_000_000 && koenAmount % 1_000_000 === 0
            ? `${koenAmount / 1_000_000}m`
            : koenAmount >= 1_000 && koenAmount % 1_000 === 0
              ? `${koenAmount / 1_000}k`
              : new Intl.NumberFormat().format(koenAmount);
        if (label.textContent !== compactAmount) label.textContent = compactAmount;
        label.setAttribute("aria-label", `${compactAmount} Koen`);
        label.classList.add("abi-koen-amount");
        if (label.parentElement !== reward) reward.append(label);
        if (image) {
          image.classList.add("abi-koen-icon");
          if (image.parentElement !== reward) reward.append(image);
          if (label.nextElementSibling !== image) reward.insertBefore(label, image);
        }
      } else {
        if (image && image.parentElement !== reward) reward.prepend(image);
        if (label && label.parentElement !== reward) reward.append(label);
      }
      const currentName = rankTitle.toLowerCase().split("+")[0].trim();
      card.classList.toggle(
        "is-current",
        Boolean(currentName) && levelText.toLowerCase().includes(currentName),
      );
    });
    while (list.children.length > rows.length) list.lastElementChild.remove();
  }

  function createRankIcon() {
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("class", "abi-rank-icon");
    icon.setAttribute("aria-hidden", "true");

    const shield = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path",
    );
    shield.setAttribute(
      "d",
      "M12 2.5 19.5 5.4v6.1c0 4.8-3 8.3-7.5 10-4.5-1.7-7.5-5.2-7.5-10V5.4L12 2.5Z",
    );
    const star = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path",
    );
    star.setAttribute(
      "d",
      "m12 6.1 1.45 2.96 3.27.48-2.36 2.3.56 3.25L12 13.55l-2.92 1.54.56-3.25-2.36-2.3 3.27-.48L12 6.1Z",
    );
    icon.append(shield, star);
    return icon;
  }

  function updateOverview(enabled) {
    const overview = document.querySelector("#wxMine > .user");
    const profile = overview?.querySelector(":scope > .user-info");
    const sourceStats = overview?.querySelector(":scope > .user-data");
    const stats = sourceStats?.querySelector(".statistics");
    if (!overview || !profile || !stats) return;

    if (!enabled) {
      restoreOverview(profile);
      return;
    }

    const getLang = typeof getCurrentLang === "function"
      ? getCurrentLang
      : (typeof window !== "undefined" && typeof window.getCurrentLang === "function"
        ? window.getCurrentLang
        : () => (typeof document !== "undefined" && document.documentElement?.dataset?.abiLang) || "en");
    const currentLang = (getLang() || "en").toLowerCase();

    const _t = (key) => {
      if (typeof t === "function") return t(key);
      if (typeof window !== "undefined" && typeof window.t === "function") return window.t(key);
      const dict = (typeof I18N !== "undefined" ? I18N : (typeof window !== "undefined" && window.I18N)) || null;
      if (dict) return dict[currentLang]?.[key] || dict.en?.[key] || key;
      const FALLBACKS = {
        currentRank: "CURRENT RANK",
        nextRank: "NEXT RANK",
        displayRanks: "Display ranks",
        copyUserId: "Copy user ID",
        userIdCopied: "Copied!",
        level: "Level",
        xpToLevel: "XP to level",
        totalXp: "Total XP",
        inspectionsHeading: "Inspections",
        lifetime: "Lifetime",
        thisSeason: "This season",
        thisWeek: "This week",
        inspectionsWord: "inspections",
        correctWord: "correct",
        wrongWord: "wrong",
        unresolvedWord: "unresolved",
        bansWord: "bans",
        accuracyHeading: "Inspection accuracy",
        recent: "Recent",
        weekly: "Weekly",
        seasonal: "Seasonal",
        overall: "Overall",
        ptsAbove: "pts above lifetime",
        ptsBelow: "pts below lifetime",
        ptsVs: "pts vs lifetime",
        todayHeading: "Today",
        ofWord: "of",
        casesRemaining: "cases remaining",
        quotaCompleted: "Daily quota complete ✓",
        rankRules: "Rank rules",
        close: "Close",
        bonusXp: "bonus XP",
        noAccuracyGate: "No accuracy gate",
        recentAccuracy: "recent accuracy",
        successfulInspections: "successful inspections",
        exitInspection: "Exit Inspection",
      };
      return FALLBACKS[key] || key;
    };

    overview.querySelector(":scope > .abi-overview-cards")?.remove();
    let shell = overview.querySelector(":scope > .abi-overview");
    if (!shell) {
      shell = document.createElement("div");
      shell.className = "abi-overview";
      const identity = document.createElement("section");
      identity.className = "abi-identity";
      identity.setAttribute("aria-label", "Inspector profile");
      const person = document.createElement("div");
      person.className = "abi-identity-person";
      const titleRow = document.createElement("div");
      titleRow.className = "abi-identity-honor abi-title-row";
      const kicker = document.createElement("span");
      kicker.className = "abi-rank-current-kicker";
      kicker.textContent = _t("currentRank");
      const rules = document.createElement("button");
      rules.type = "button";
      rules.className = "abi-rank-open";
      rules.setAttribute("aria-label", _t("displayRanks"));
      rules.title = _t("displayRanks");
      rules.append(createRankIcon());
      titleRow.append(kicker, rules);
      const meter = document.createElement("div");
      meter.className = "abi-meter";
      identity.append(person, titleRow, meter);
      const board = document.createElement("div");
      board.className = "abi-board";
      board.setAttribute("aria-label", "Inspection statistics");
      shell.append(identity, board);
      overview.append(shell);
      let wasVisible = false;
      const entrance = new IntersectionObserver(([entry]) => {
        if (!shell.isConnected) { entrance.disconnect(); return; }
        const visible = entry.isIntersecting;
        if (visible && !wasVisible && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
          shell.querySelectorAll(".abi-identity > div, .abi-stat-card").forEach((node, index) => {
            node.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
              { duration: 340, delay: index * 35, easing: "ease-out", fill: "backwards" });
          });
          shell.querySelectorAll(".abi-rank-fill, .abi-level-fill").forEach((node) => {
            if (!document.documentElement.hasAttribute("data-abi-anonymized")) node.animate(
              [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
              { duration: 850, delay: 100, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" });
          });
        }
        wasVisible = visible;
      });
      entrance.observe(shell);
    }
    shell.querySelector(":scope > .abi-overview-head")?.remove();

    const identity = shell.querySelector(".abi-identity");
    const person = shell.querySelector(".abi-identity-person");
    let titleRow = shell.querySelector(".abi-identity-honor") || shell.querySelector(".abi-title-row");
    if (!titleRow) {
      titleRow = document.createElement("div");
      titleRow.className = "abi-identity-honor abi-title-row";
    } else {
      if (!titleRow.classList.contains("abi-identity-honor")) titleRow.classList.add("abi-identity-honor");
      if (!titleRow.classList.contains("abi-title-row")) titleRow.classList.add("abi-title-row");
    }
    const meter = shell.querySelector(".abi-meter");
    const oldRank = shell.querySelector(".abi-identity-rank");
    if (oldRank && identity) {
      while (oldRank.firstChild) identity.insertBefore(oldRank.firstChild, oldRank);
      oldRank.remove();
    }
    if (identity && titleRow.parentElement !== identity) {
      identity.insertBefore(titleRow, meter || null);
    }

    const avatar =
      profile.querySelector(":scope > .avatar") ||
      person?.querySelector(":scope > .avatar");
    const username = profile.querySelector(":scope > .username") || shell.querySelector(".username");
    const userid = profile.querySelector(":scope > .userid") || shell.querySelector(".userid");
    const honor = profile.querySelector(":scope > .honor") || shell.querySelector(".honor");
    if (avatar && avatar.parentElement !== person) {
      person.insertBefore(avatar, person.firstChild);
    }
    if (username && username.parentElement !== person) {
      person.append(username);
    }
    if (userid && userid.parentElement !== person) person.append(userid);
    if (username && userid && username.nextElementSibling !== userid) {
      person.insertBefore(username, userid);
    }
    const copyBtnExisting = userid?.querySelector(".abi-copy-id");
    if (copyBtnExisting && !copyBtnExisting.classList.contains("abi-copied")) {
      copyBtnExisting.setAttribute("aria-label", _t("copyUserId"));
      copyBtnExisting.title = _t("copyUserId");
    } else if (userid && !copyBtnExisting) {
      const copyBtn = document.createElement("button");
      copyBtn.type = "button";
      copyBtn.className = "abi-copy-id";
      copyBtn.setAttribute("aria-label", _t("copyUserId"));
      copyBtn.title = _t("copyUserId");
      copyBtn.innerHTML = `<svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor"><path d="M4 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"/></svg>`;
      copyBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const raw = userid.querySelector("span")?.textContent || userid.textContent || "";
        const idText = raw.replace(/[^\w\d_-]/g, "");
        if (idText) {
          try {
            await navigator.clipboard.writeText(idText);
            copyBtn.classList.add("abi-copied");
            copyBtn.title = _t("userIdCopied");
            setTimeout(() => {
              copyBtn.classList.remove("abi-copied");
              copyBtn.title = _t("copyUserId");
            }, 1800);
          } catch {}
        }
      });
      userid.append(copyBtn);
    }
    let currentKicker = titleRow?.querySelector(".abi-rank-current-kicker");
    if (!currentKicker && titleRow) {
      currentKicker = document.createElement("span");
      currentKicker.className = "abi-rank-current-kicker";
      currentKicker.textContent = _t("currentRank");
      titleRow.prepend(currentKicker);
    } else if (currentKicker) {
      updateText(currentKicker, _t("currentRank"));
    }
    const rulesButton = titleRow?.querySelector(".abi-rank-open");
    if (rulesButton) {
      rulesButton.setAttribute("aria-label", _t("displayRanks"));
      rulesButton.title = _t("displayRanks");
      if (!rulesButton.querySelector(".abi-rank-icon")) {
        rulesButton.replaceChildren(createRankIcon());
      }
    }
    if (honor && titleRow && honor.parentElement !== titleRow) {
      titleRow.append(honor);
    }
    titleRow?.querySelector(".abi-rank-rules-hint")?.remove();

    let cards = shell.querySelector(".abi-board");
    let progress = shell.querySelector(".abi-rank-progress") || profile.querySelector(".abi-rank-progress");
    const grade = profile.querySelector(":scope > .grade") || shell.querySelector(".grade");
    place(identity, grade);

    if (cards && cards.querySelector(":scope > .abi-stat-card") && !cards.querySelector(".abi-stat-values")) {
      cards.replaceChildren();
    }

    const statValues = [...stats.querySelectorAll(":scope > li:not(.record)")];
    if (statValues.length < 5) return;

    const readValue = (index) =>
      statValues[index]?.querySelector("strong")?.textContent.trim() || "—";
    const total = readValue(0);
    const successful = readValue(2);
    const recentAccuracy = readValue(3);
    const bans = readValue(4);
    const live = window.__abiOverviewData || {};
    const summary = live.userJudgeSummary || {};
    const weekSummary = live.userWeekJudgeSummary || {};
    const growth = live.userGrowthSummary || {};
    const count = (value) => Number.isFinite(value) ? value.toLocaleString("en-US") : "—";
    const parseCount = (value) => Number(String(value).replace(/[^\d]/g, "")) || 0;
    const totalCount = parseCount(total);
    const successfulCount = parseCount(successful);
    const bansCount = parseCount(bans);
    const recentAccuracyNum = parseFloat(recentAccuracy.replace(/[^\d.]/g, "")) || null;
    const lifeWrong = Number.isFinite(summary.life_wrong_case_num) ? summary.life_wrong_case_num : 0;

    const calculateAccuracy = (periodKey, { correct, wrong, summaryAccuracy }) => {
      const resolved = (correct || 0) + (wrong || 0);
      if (resolved === 0) return null;

      if (periodKey === "weekly") {
        return (correct / resolved) * 100;
      }
      if (periodKey === "overall") {
        return Number.isFinite(summaryAccuracy) ? summaryAccuracy / 100 : null;
      }
      if (periodKey === "season") {
        return Number.isFinite(summaryAccuracy) ? summaryAccuracy / 100 : (correct > 0 ? (correct / resolved) * 100 : null);
      }
      return null;
    };

    const weeklyAccuracyNum = calculateAccuracy("weekly", {
      correct: weekSummary.week_right_num,
      wrong: weekSummary.week_wrong_num,
    });
    const seasonAccuracyNum = calculateAccuracy("season", {
      correct: summary.season_right_case_num,
      wrong: summary.season_wrong_case_num,
      summaryAccuracy: summary.season_accuracy,
    });
    const lifeAccuracyNum = calculateAccuracy("overall", {
      correct: successfulCount,
      wrong: lifeWrong,
      summaryAccuracy: summary.life_accuracy,
    });

    const formatAccuracy = (val) =>
      val !== null && Number.isFinite(val) ? `${val.toFixed(1)}%` : "--";

    const getAccuracyTier = (val) => {
      if (val === null || !Number.isFinite(val)) return null;
      if (val >= 90) return "high";
      if (val >= 80) return "good";
      if (val >= 70) return "warning";
      return "critical";
    };

    const recordRows = stats.querySelectorAll(
      ".record #judgePunishRecord > li:not(:first-child)",
    );
    const lastBan = [...recordRows]
      .map((row) => row.querySelector("span")?.textContent.trim() || "")
      .filter((value) => /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value))
      .sort()
      .at(-1);

    let daysAgo = null;
    if (lastBan) {
      const [banYear, banMonth, banDate] = lastBan
        .slice(0, 10)
        .split("-")
        .map(Number);
      const now = new Date();
      const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
      const banDay = Date.UTC(banYear, banMonth - 1, banDate);
      daysAgo = Math.max(0, Math.floor((today - banDay) / 86_400_000));
    }
    const lastBanLabel =
      daysAgo === null
        ? "No ban recorded"
        : daysAgo === 0
          ? "Today"
          : daysAgo === 1
            ? "1 day ago"
            : `${daysAgo} days ago`;
    const lastBanShort = daysAgo === null ? "None" : daysAgo === 0 ? "Today" : `${daysAgo}d ago`;

    cards.querySelectorAll(".abi-stat-volume, .abi-stat-season, .abi-stat-weekly").forEach((node) => node.remove());

    const cardDefs = [
      ["abi-stat-inspections", _t("inspectionsHeading")],
      ["abi-stat-accuracy", _t("accuracyHeading")],
      ["abi-stat-today", _t("todayHeading")],
    ];

    for (const [className, label] of cardDefs) {
      let card = cards.querySelector(`.${className}`);
      if (!card) {
        card = document.createElement("section");
        card.className = `abi-stat-card ${className}`;
        const heading = document.createElement("h3");
        heading.textContent = label;
        const values = document.createElement("div");
        values.className = "abi-stat-values";
        card.append(heading, values);
        cards.append(card);
      }
    }

    const orderedCards = cardDefs
      .map(([className]) => cards.querySelector(`.${className}`))
      .filter(Boolean);
    if (
      orderedCards.some((card, index) => cards.children[index] !== card)
    ) {
      cards.append(...orderedCards);
    }
    updateText(
      cards.querySelector(".abi-stat-accuracy > h3"),
      _t("accuracyHeading"),
    );
    updateText(
      cards.querySelector(".abi-stat-today > h3"),
      _t("todayHeading"),
    );
    updateText(
      cards.querySelector(".abi-stat-inspections > h3"),
      _t("inspectionsHeading"),
    );

    // 1. Accuracy Card
    const accuracyValues = cards.querySelector(".abi-stat-accuracy .abi-stat-values");
    if (accuracyValues) {
      let hero = accuracyValues.querySelector(".abi-accuracy-hero");
      if (!hero) {
        hero = document.createElement("div");
        hero.className = "abi-accuracy-hero";
        accuracyValues.append(hero);
      }
      let recentItem = hero.querySelector('[data-stat="recent-accuracy"]');
      if (!recentItem) {
        recentItem = document.createElement("div");
        recentItem.className = "abi-stat-item";
        recentItem.dataset.stat = "recent-accuracy";
        const label = document.createElement("span");
        label.className = "abi-stat-label";
        label.textContent = _t("recent");
        const strong = document.createElement("strong");
        recentItem.append(label, strong);
        hero.append(recentItem);
      } else {
        updateText(recentItem.querySelector(".abi-stat-label"), _t("recent"));
      }
      const recentStrong = recentItem.querySelector("strong");
      updateText(recentStrong, formatAccuracy(recentAccuracyNum));
      const recentTier = getAccuracyTier(recentAccuracyNum);
      if (recentTier) recentItem.dataset.tier = recentTier;
      else delete recentItem.dataset.tier;

      let trend = recentItem.querySelector(".abi-stat-trend");
      if (recentAccuracyNum !== null && lifeAccuracyNum !== null) {
        if (!trend) {
          trend = document.createElement("span");
          trend.className = "abi-stat-trend";
          recentItem.append(trend);
        }
        const delta = recentAccuracyNum - lifeAccuracyNum;
        if (delta > 0) {
          updateText(trend, `↗ ${delta.toFixed(1)} ${_t("ptsAbove")}`);
          trend.dataset.direction = "up";
        } else if (delta < 0) {
          updateText(trend, `↘ ${Math.abs(delta).toFixed(1)} ${_t("ptsBelow")}`);
          trend.dataset.direction = "down";
        } else {
          updateText(trend, `• 0.0 ${_t("ptsVs")}`);
          trend.dataset.direction = "flat";
        }
        trend.title = `Recent (${recentAccuracyNum.toFixed(1)}%) compared to Lifetime (${lifeAccuracyNum.toFixed(1)}%)`;
      } else {
        trend?.remove();
      }

      let rows = accuracyValues.querySelector(".abi-accuracy-rows");
      if (!rows) {
        rows = document.createElement("div");
        rows.className = "abi-accuracy-rows";
        accuracyValues.append(rows);
      }

      const rowsConfig = [
        {
          key: "weekly-accuracy",
          label: _t("weekly"),
          num: weeklyAccuracyNum,
          tooltip: "Calculated from correct / (correct + wrong) this week; unresolved inspections are excluded.",
          deltaType: "diff",
        },
        {
          key: "seasonal-accuracy",
          label: _t("seasonal"),
          num: seasonAccuracyNum,
          tooltip: "Calculated from season inspection data.",
          deltaType: "diff",
        },
        {
          key: "overall-accuracy",
          label: _t("overall"),
          num: lifeAccuracyNum,
          tooltip: "Calculated from lifetime inspection data.",
          deltaType: "none",
        },
      ];

      for (const conf of rowsConfig) {
        let item = rows.querySelector(`[data-stat="${conf.key}"]`);
        if (!item) {
          item = document.createElement("div");
          item.className = "abi-stat-item";
          item.dataset.stat = conf.key;
          const label = document.createElement("span");
          label.className = "abi-stat-label";
          label.textContent = conf.label;
          const right = document.createElement("div");
          right.className = "abi-stat-right";
          const delta = document.createElement("span");
          delta.className = "abi-stat-delta";
          const strong = document.createElement("strong");
          right.append(delta, strong);
          item.append(label, right);
          rows.append(item);
        } else {
          updateText(item.querySelector(".abi-stat-label"), conf.label);
          const right = item.querySelector(".abi-stat-right");
          const strong = right?.querySelector("strong");
          const delta = right?.querySelector(".abi-stat-delta");
          if (right && delta && strong && delta.nextElementSibling !== strong) {
            right.append(delta, strong);
          }
        }
        item.title = conf.tooltip;
        const tier = getAccuracyTier(conf.num);
        if (tier) item.dataset.tier = tier;
        else delete item.dataset.tier;
        updateText(item.querySelector("strong"), formatAccuracy(conf.num));

        const deltaNode = item.querySelector(".abi-stat-delta");
        if (conf.deltaType === "none" || !conf.deltaType) {
          if (deltaNode.className !== "abi-stat-delta") deltaNode.className = "abi-stat-delta";
          updateText(deltaNode, "");
        } else {
          if (conf.num !== null && lifeAccuracyNum !== null) {
            const diff = conf.num - lifeAccuracyNum;
            const diffSign = diff > 0 ? "+" : "";
            updateText(deltaNode, `${diffSign}${diff.toFixed(1)}%`);
            const targetCls = `abi-stat-delta ${diff > 0 ? "abi-delta-positive" : diff < 0 ? "abi-delta-negative" : "abi-delta-flat"}`;
            if (deltaNode.className !== targetCls) deltaNode.className = targetCls;
          } else {
            if (deltaNode.className !== "abi-stat-delta") deltaNode.className = "abi-stat-delta";
            updateText(deltaNode, "");
          }
        }
      }
    }

    // 2. Today Card
    const todayValues = cards.querySelector(".abi-stat-today .abi-stat-values");
    if (todayValues) {
      let wrap = todayValues.querySelector(".abi-today-wrap");
      if (!wrap) {
        wrap = document.createElement("div");
        wrap.className = "abi-today-wrap";
        const ringBox = document.createElement("div");
        ringBox.className = "abi-today-ring-box";
        ringBox.setAttribute("role", "progressbar");
        ringBox.setAttribute("aria-label", "Today's inspection quota");

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "abi-today-ring");
        svg.setAttribute("width", "110");
        svg.setAttribute("height", "110");
        svg.setAttribute("viewBox", "0 0 110 110");

        const track = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        track.setAttribute("class", "abi-today-ring-track");
        track.setAttribute("cx", "55");
        track.setAttribute("cy", "55");
        track.setAttribute("r", "51");
        track.setAttribute("fill", "none");
        track.setAttribute("stroke-width", "8");

        const fill = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        fill.setAttribute("class", "abi-today-ring-fill abi-today-fill");
        fill.setAttribute("cx", "55");
        fill.setAttribute("cy", "55");
        fill.setAttribute("r", "51");
        fill.setAttribute("fill", "none");
        fill.setAttribute("stroke-width", "8");
        fill.setAttribute("stroke-linecap", "round");

        svg.append(track, fill);

        const center = document.createElement("div");
        center.className = "abi-today-center abi-today-count";
        const done = document.createElement("strong");
        done.className = "abi-today-done";
        const limitWrap = document.createElement("span");
        limitWrap.className = "abi-today-limit-wrap";
        limitWrap.append(document.createTextNode(`${_t("ofWord")} `), Object.assign(document.createElement("span"), { className: "abi-today-limit" }));
        center.append(done, document.createTextNode(" "), limitWrap);

        ringBox.append(svg, center);

        const remaining = document.createElement("span");
        remaining.className = "abi-today-remaining";

        wrap.append(ringBox, remaining);
        todayValues.replaceChildren(wrap);
      }

      const limitWrapNode = wrap.querySelector(".abi-today-limit-wrap");
      const targetOf = `${_t("ofWord")} `;
      if (limitWrapNode && limitWrapNode.firstChild && limitWrapNode.firstChild !== limitWrapNode.querySelector(".abi-today-limit")) {
        if (limitWrapNode.firstChild.textContent !== targetOf) limitWrapNode.firstChild.textContent = targetOf;
      }

      const dayDone = Number.isFinite(summary.day_judged_num) ? summary.day_judged_num : null;
      const dayLimit = Number.isFinite(summary.day_permit_num) ? summary.day_permit_num : null;
      const dayReady = dayDone !== null && dayLimit !== null;
      const dayPercent = dayReady && dayLimit > 0 ? Math.min(100, Math.round((dayDone / dayLimit) * 100)) : 0;

      const ringBox = wrap.querySelector(".abi-today-ring-box");
      const todayFill = wrap.querySelector(".abi-today-fill");
      const todayRemaining = wrap.querySelector(".abi-today-remaining");
      const doneNode = wrap.querySelector(".abi-today-done");
      const limitNode = wrap.querySelector(".abi-today-limit");

      updateText(doneNode, count(dayDone));
      updateText(limitNode, count(dayLimit));

      ringBox.setAttribute("aria-valuenow", String(dayDone ?? 0));
      ringBox.setAttribute("aria-valuemax", String(dayLimit ?? 100));

      const RING_RADIUS = 51;
      const RING_CIRCUMFERENCE = +(2 * Math.PI * RING_RADIUS).toFixed(2); // 320.44

      const setRingProgress = (fillNode, percentage) => {
        const clamped = Math.max(0, Math.min(percentage, 100));
        const target = `${clamped}%`;
        fillNode.dataset.abiProgressTarget = target;
        const offset = RING_CIRCUMFERENCE * (1 - clamped / 100);
        fillNode.style.strokeDasharray = `${RING_CIRCUMFERENCE}`;
        if (!fillNode.dataset.abiProgressReady) {
          fillNode.dataset.abiProgressReady = "true";
          fillNode.style.strokeDashoffset = `${RING_CIRCUMFERENCE}`;
          requestAnimationFrame(() => {
            if (fillNode.isConnected) fillNode.style.strokeDashoffset = `${offset}`;
          });
          return;
        }
        fillNode.style.strokeDashoffset = `${offset}`;
      };

      setRingProgress(todayFill, dayPercent);

      if (dayReady) {
        if (dayDone >= dayLimit && dayLimit > 0) {
          updateText(todayRemaining, _t("quotaCompleted"));
          todayRemaining.dataset.status = "done";
          todayFill.dataset.state = "done";
        } else {
          const remCases = Math.max(0, dayLimit - dayDone);
          updateText(todayRemaining, `${remCases.toLocaleString("en-US")} ${_t("casesRemaining")}`);
          if (remCases <= 5 && remCases > 0) {
            todayRemaining.dataset.status = "warning";
            todayFill.dataset.state = "warning";
          } else {
            todayRemaining.dataset.status = "active";
            todayFill.dataset.state = "normal";
          }
        }
      } else {
        updateText(todayRemaining, _t("todayHeading"));
        delete todayRemaining.dataset.status;
        todayFill.dataset.state = "empty";
      }
    }

    // 3. Inspections Card
    const inspectionsValues = cards.querySelector(".abi-stat-inspections .abi-stat-values");
    if (inspectionsValues) {
      const rowsData = [
        {
          period: "lifetime",
          label: _t("lifetime"),
          inspections: totalCount,
          correct: successfulCount,
          wrong: lifeWrong,
          bans: bansCount,
          accuracy: lifeAccuracyNum,
          lastBan: lastBanShort,
          lastBanTitle: `Last ban: ${lastBanLabel}`,
        },
        {
          period: "season",
          label: _t("thisSeason"),
          inspections: summary.season_total_case_num ?? 0,
          correct: summary.season_right_case_num ?? 0,
          wrong: summary.season_wrong_case_num ?? 0,
          bans: summary.season_right_punish_case_num ?? 0,
          accuracy: seasonAccuracyNum,
          lastBan: null,
          lastBanTitle: "Bans this season",
        },
        {
          period: "weekly",
          label: _t("thisWeek"),
          inspections: weekSummary.week_total_num ?? 0,
          correct: weekSummary.week_right_num ?? 0,
          wrong: weekSummary.week_wrong_num ?? 0,
          bans: weekSummary.week_right_punish_num ?? 0,
          accuracy: weeklyAccuracyNum,
          lastBan: null,
          lastBanTitle: "Bans this week",
        },
      ];

      const setSegmentProgress = (node, percentage) => {
        const clamped = Math.max(0, Math.min(percentage, 100));
        const target = `${clamped}%`;
        node.dataset.abiProgressTarget = target;
        if (typeof window !== "undefined" && window.setProgress && window.setProgress !== setProgress) {
          window.setProgress(node, clamped);
          return;
        }
        if (!node.dataset.abiProgressReady) {
          node.dataset.abiProgressReady = "true";
          node.style.width = "0%";
          requestAnimationFrame(() => {
            if (node.isConnected) node.style.width = node.dataset.abiProgressTarget;
          });
          return;
        }
        node.style.width = target;
      };

      for (const row of rowsData) {
        let rowNode = inspectionsValues.querySelector(`[data-period="${row.period}"]`);
        if (!rowNode) {
          rowNode = document.createElement("div");
          rowNode.className = "abi-inspection-row";
          rowNode.dataset.period = row.period;

          const periodCol = document.createElement("div");
          periodCol.className = "abi-inspection-period";
          const pName = document.createElement("span");
          pName.className = "abi-period-name";
          pName.textContent = row.label;
          const pTotal = document.createElement("span");
          pTotal.className = "abi-period-total";
          pTotal.dataset.stat = "Inspections";
          periodCol.append(pName, pTotal);

          const barWrap = document.createElement("div");
          barWrap.className = "abi-stacked-bar-wrap";
          const bar = document.createElement("div");
          bar.className = "abi-stacked-bar";
          bar.setAttribute("role", "img");
          const legend = document.createElement("div");
          legend.className = "abi-bar-legend";
          barWrap.append(bar, legend);

          const metaCol = document.createElement("div");
          metaCol.className = "abi-inspection-meta";
          const accNode = document.createElement("strong");
          accNode.className = "abi-inspection-accuracy";
          accNode.dataset.stat = "accuracy";
          const bansNode = document.createElement("span");
          bansNode.className = "abi-inspection-bans";
          bansNode.dataset.stat = "Bans";
          metaCol.append(accNode, bansNode);

          rowNode.append(periodCol, barWrap, metaCol);
          inspectionsValues.append(rowNode);
        } else {
          updateText(rowNode.querySelector(".abi-period-name"), row.label);
        }

        // Update period total
        const pTotal = rowNode.querySelector(".abi-period-total");
        let pStrong = pTotal.querySelector("strong");
        if (!pStrong) {
          pStrong = document.createElement("strong");
          pTotal.prepend(pStrong);
        }
        updateText(pStrong, count(row.inspections));
        const pWord = ` ${_t("inspectionsWord")}`;
        if (pStrong.nextSibling) {
          if (pStrong.nextSibling.textContent !== pWord) pStrong.nextSibling.textContent = pWord;
        } else {
          pTotal.append(document.createTextNode(pWord));
        }

        // Update stacked bar and legend
        const bar = rowNode.querySelector(".abi-stacked-bar");
        const legend = rowNode.querySelector(".abi-bar-legend");
        const unresolved = Math.max(0, row.inspections - row.correct - row.wrong);

        if (row.inspections === 0) {
          bar.setAttribute("aria-label", `${row.label}: 0 inspections`);
          bar.querySelectorAll(".abi-bar-correct, .abi-bar-wrong, .abi-bar-unresolved").forEach((n) => n.remove());
          let emptySeg = bar.querySelector(".abi-bar-empty");
          if (!emptySeg) {
            emptySeg = document.createElement("div");
            emptySeg.className = "abi-bar-segment abi-bar-empty";
            bar.append(emptySeg);
          }
          emptySeg.title = `${row.label}: 0 inspections`;
          setSegmentProgress(emptySeg, 100);
        } else {
          bar.querySelector(".abi-bar-empty")?.remove();
          bar.setAttribute(
            "aria-label",
            `${row.label}: ${count(row.correct)} correct, ${count(row.wrong)} wrong, ${count(unresolved)} unresolved of ${count(row.inspections)} inspections`,
          );
          const correctPct = (row.correct / row.inspections) * 100;
          const wrongPct = (row.wrong / row.inspections) * 100;
          const unresolvedPct = Math.max(0, 100 - correctPct - wrongPct);

          const segDefs = [
            { key: "correct", cls: "abi-bar-correct", val: row.correct, pct: correctPct, label: "Correct" },
            { key: "wrong", cls: "abi-bar-wrong", val: row.wrong, pct: wrongPct, label: "Wrong" },
            { key: "unresolved", cls: "abi-bar-unresolved", val: unresolved, pct: unresolvedPct, label: "Unresolved" },
          ];

          for (const s of segDefs) {
            let seg = bar.querySelector(`.${s.cls}`);
            if (s.pct > 0) {
              if (!seg) {
                seg = document.createElement("div");
                seg.className = `abi-bar-segment ${s.cls}`;
                seg.dataset.stat = s.key;
                bar.append(seg);
              }
              seg.title = `${s.label}: ${count(s.val)} (${s.pct.toFixed(1)}%) of ${count(row.inspections)} inspections`;
              setSegmentProgress(seg, s.pct);
            } else if (seg) {
              seg.remove();
            }
          }
          const orderedSegs = ["abi-bar-correct", "abi-bar-wrong", "abi-bar-unresolved"]
            .map((c) => bar.querySelector(`.${c}`))
            .filter(Boolean);
          if (orderedSegs.length > 1) {
            const currentSegs = [...bar.children];
            const inOrder = orderedSegs.every((seg, idx) => currentSegs[idx] === seg);
            if (!inOrder) bar.append(...orderedSegs);
          }
        }

        const legDefs = [
          { cls: "abi-legend-correct", stat: "Correct", val: count(row.correct), word: _t("correctWord") },
          { cls: "abi-legend-wrong", stat: "Wrong", val: count(row.wrong), word: _t("wrongWord") },
          { cls: "abi-legend-unresolved", stat: "Unresolved", val: count(unresolved), word: _t("unresolvedWord") },
        ];
        for (const def of legDefs) {
          let item = legend.querySelector(`.${def.cls}`);
          if (!item) {
            item = document.createElement("span");
            item.className = `abi-legend-item ${def.cls}`;
            item.dataset.stat = def.stat;
            const s = document.createElement("strong");
            item.append(s, document.createTextNode(""));
            legend.append(item);
          }
          const s = item.querySelector("strong");
          if (s) updateText(s, def.val);
          const textNode = item.lastChild;
          const labelText = ` ${def.word}`;
          if (textNode && textNode.nodeType === Node.TEXT_NODE) {
            if (textNode.textContent !== labelText) textNode.textContent = labelText;
          } else {
            item.append(document.createTextNode(labelText));
          }
        }

        // Update accuracy
        const accNode = rowNode.querySelector(".abi-inspection-accuracy");
        updateText(accNode, formatAccuracy(row.accuracy));
        const tier = getAccuracyTier(row.accuracy);
        if (tier) accNode.dataset.tier = tier;
        else delete accNode.dataset.tier;

        // Update bans
        const bansNode = rowNode.querySelector(".abi-inspection-bans");
        if (bansNode.title !== row.lastBanTitle) bansNode.title = row.lastBanTitle;
        let bansStrong = bansNode.querySelector("strong");
        if (!bansStrong) {
          bansStrong = document.createElement("strong");
          bansNode.prepend(bansStrong);
        }
        updateText(bansStrong, count(row.bans));
        const subLabel = bansNode.querySelector(".abi-stat-sublabel");
        if (row.lastBan) {
          if (!subLabel) {
            const sub = document.createElement("span");
            sub.className = "abi-stat-sublabel";
            sub.textContent = row.lastBan;
            bansNode.append(document.createTextNode(` ${_t("bansWord")} `), sub);
          } else {
            updateText(subLabel, row.lastBan);
            const banWordNode = bansStrong.nextSibling;
            const bwText = ` ${_t("bansWord")} `;
            if (banWordNode && banWordNode.nodeType === Node.TEXT_NODE && banWordNode.textContent !== bwText) {
              banWordNode.textContent = bwText;
            }
          }
        } else {
          subLabel?.remove();
          const banWordNode = bansStrong.nextSibling;
          const bwText = ` ${_t("bansWord")}`;
          if (banWordNode && banWordNode.nodeType === Node.TEXT_NODE) {
            if (banWordNode.textContent !== bwText) banWordNode.textContent = bwText;
          } else {
            bansNode.append(document.createTextNode(bwText));
          }
        }
      }
    }

    const levelText =
      profile.querySelector("#level-text")?.textContent.trim() ||
      shell.querySelector("#level-text")?.textContent.trim() ||
      "";
    const inspectorLevel = growth.ret_exp_level ?? (Number(
      (
        profile.querySelector("#exp_level") ||
        shell.querySelector("#exp_level")
      )?.textContent.replace(/[^\d]/g, ""),
    ) || 0);
    const currentIndex = ranks.findIndex((rank) =>
      levelText.toLowerCase().includes(rank.title.toLowerCase()),
    );
    const expertRank = ranks.at(-1);
    const nextRank =
      ranks.find((rank) => rank.required > successfulCount) ||
      (inspectorLevel < expertRank.levelRequired ? expertRank : null);
    if (!progress) {
      progress = document.createElement("div");
      progress.className = "abi-rank-progress";
    }
    place(meter, progress);

    let levelProgress = shell.querySelector(".abi-level-progress");
    if (!levelProgress) {
      levelProgress = document.createElement("div");
      levelProgress.className = "abi-level-progress";
      const label = document.createElement("span");
      label.className = "abi-level-label";
      const percent = document.createElement("span");
      percent.className = "abi-level-percent";
      const track = document.createElement("span");
      track.className = "abi-level-track";
      const fill = document.createElement("span");
      fill.className = "abi-level-fill";
      track.append(fill);
      const count = document.createElement("strong");
      count.className = "abi-level-count";
      const caption = document.createElement("span");
      caption.className = "abi-level-caption";
      levelProgress.append(label, percent, track, count, caption);
      identity?.append(levelProgress);
    }
    if (identity && levelProgress.parentElement !== identity) {
      identity.append(levelProgress);
    }
    levelProgress.querySelector(".abi-level-kicker")?.remove();
    let levelLabel = levelProgress.querySelector(".abi-level-label");
    if (!levelLabel) {
      levelLabel = document.createElement("span");
      levelLabel.className = "abi-level-label";
      levelProgress.prepend(levelLabel);
    }
    let levelPercentNode = levelProgress.querySelector(".abi-level-percent");
    if (!levelPercentNode) {
      levelPercentNode = document.createElement("span");
      levelPercentNode.className = "abi-level-percent";
      levelProgress.insertBefore(levelPercentNode, levelProgress.querySelector(".abi-level-track") || null);
    }
    let levelTrack = levelProgress.querySelector(".abi-level-track");
    if (!levelTrack) {
      levelTrack = document.createElement("span");
      levelTrack.className = "abi-level-track";
      const fill = document.createElement("span");
      fill.className = "abi-level-fill";
      levelTrack.append(fill);
      levelProgress.append(levelTrack);
    }
    let levelCaption = levelProgress.querySelector(".abi-level-caption");
    if (!levelCaption) {
      levelCaption = document.createElement("span");
      levelCaption.className = "abi-level-caption";
      levelProgress.append(levelCaption);
    }
    let levelCount = levelProgress.querySelector(".abi-level-count");
    if (!levelCount) {
      levelCount = document.createElement("strong");
      levelCount.className = "abi-level-count";
      levelProgress.append(levelCount);
    }
    const xpReady = Number.isFinite(growth.level_got_exp) && Number.isFinite(growth.exp_step) && growth.exp_step > 0;
    const levelPercent = xpReady ? Math.min(growth.level_got_exp / growth.exp_step, 1) * 100 : 0;
    updateText(levelLabel, `${_t("level")} ${inspectorLevel}`);
    updateText(levelPercentNode, xpReady ? `${levelPercent.toFixed(1)}%` : "—");
    if (!levelCount.querySelector(".abi-level-current")) {
      const current = document.createElement("span");
      current.className = "abi-level-current";
      const maximum = document.createElement("span");
      maximum.className = "abi-level-maximum";
      levelCount.replaceChildren(current, document.createTextNode(" / "), maximum);
    }
    updateText(levelCount.querySelector(".abi-level-current"), xpReady ? count(growth.level_got_exp) : "—");
    updateText(levelCount.querySelector(".abi-level-maximum"), xpReady ? `${count(growth.exp_step)} XP` : "— XP");
    const remainingXp = xpReady ? count(Math.max(0, growth.exp_step - growth.level_got_exp)) : "—";
    const totalXpText = Number.isFinite(growth.total_exp) ? ` · ${_t("totalXp")}: ${count(growth.total_exp)} XP` : "";
    updateText(
      levelCaption,
      xpReady ? `${remainingXp} ${_t("xpToLevel")} ${inspectorLevel + 1}${totalXpText}` : "Waiting for progression data",
    );
    let xpDetails = levelProgress.querySelector(".abi-level-xp");
    if (!xpDetails) {
      xpDetails = document.createElement("span");
      xpDetails.className = "abi-level-xp";
      levelProgress.append(xpDetails);
    }
    updateText(xpDetails, `${_t("totalXp")}: ${count(growth.total_exp)}`);
    levelProgress.title = xpDetails.textContent;
    const levelFill = levelTrack.querySelector(".abi-level-fill");
    setProgress(levelFill, levelPercent);
    levelTrack.setAttribute("role", "progressbar");
    levelTrack.setAttribute("aria-valuemin", "0");
    levelTrack.setAttribute("aria-valuemax", String(xpReady ? growth.exp_step : 100));
    levelTrack.setAttribute("aria-valuenow", String(xpReady ? Math.min(growth.level_got_exp, growth.exp_step) : 0));
    levelTrack.setAttribute(
      "aria-label",
      `XP toward level ${inspectorLevel + 1}`,
    );
    levelTrack.setAttribute("aria-valuetext", levelCaption.textContent);

    const ensureChild = (className, tag) => {
      let node = progress.querySelector(`:scope > .${className}`);
      if (!node) {
        node = document.createElement(tag);
        node.className = className;
        progress.append(node);
      }
      return node;
    };
    const kickerNode = ensureChild("abi-rank-kicker", "span");
    const percentNode = ensureChild("abi-rank-percent", "span");
    const captionNode = ensureChild("abi-rank-caption", "span");
    const countNode = ensureChild("abi-rank-count", "strong");
    let track = progress.querySelector(":scope > .abi-rank-track");
    if (!track) {
      track = document.createElement("span");
      track.className = "abi-rank-track";
      progress.append(track);
    }
    let fill = track.querySelector(":scope > .abi-rank-fill");
    if (!fill) {
      fill = document.createElement("span");
      fill.className = "abi-rank-fill";
      track.append(fill);
    }

    const atTop =
      !nextRank &&
      (currentIndex >= ranks.length - 1 ||
        successfulCount >= ranks.at(-1).required);
    const rankKicker = nextRank ? _t("nextRank") : atTop ? _t("currentRank") : _t("rankRules");
    const getRankTitle = (r) => {
      if (!r) return "";
      const rawTitle = typeof r === "string" ? r : r.title || "";
      if (typeof getLocalizedRankTitle === "function") {
        return getLocalizedRankTitle(rawTitle, currentLang);
      }
      if (typeof window !== "undefined" && typeof window.getLocalizedRankTitle === "function") {
        return window.getLocalizedRankTitle(rawTitle, currentLang);
      }
      return rawTitle;
    };
    const rankLabel = nextRank
      ? getRankTitle(nextRank)
      : atTop
        ? (levelText ? getRankTitle(levelText) : "Highest inspection rank")
        : "Rank progress";
    const expertPending = nextRank === expertRank;
    const rankCount = nextRank
      ? `${successful} / ${nextRank.required}${expertPending ? ` · Lv. ${inspectorLevel} / ${expertRank.levelRequired}` : ""}`
      : `${successful} ${_t("successfulInspections")}`;
    const fillRatio = nextRank
      ? expertPending
        ? (Math.min(successfulCount / nextRank.required, 1) +
            Math.min(inspectorLevel / expertRank.levelRequired, 1)) /
          2
        : Math.min(successfulCount / nextRank.required, 1)
      : 1;
    const percent = Math.round(fillRatio * 100);
    updateText(kickerNode, rankKicker);
    updateText(captionNode, rankLabel);
    updateText(countNode, rankCount);
    updateText(percentNode, `${percent}%`);
    setProgress(fill, fillRatio * 100);
    track.setAttribute("role", "progressbar");
    track.setAttribute("aria-valuemin", "0");
    track.setAttribute("aria-valuemax", "100");
    track.setAttribute("aria-valuenow", String(percent));
    track.setAttribute("aria-valuetext", `${percent} percent, ${rankCount}`);
    track.setAttribute("aria-label", `${rankKicker}: ${rankLabel}`);
    syncRankDialog(profile, levelText);
    const rules = shell.querySelector(".abi-rank-open");
    const dialog = document.querySelector("#wxMine > .abi-rank-dialog");
    if (rules && dialog && !rules.dataset.abiBound) {
      rules.dataset.abiBound = "1";
      rules.addEventListener("click", () => {
        dialog.hidden = false;
        dialog.querySelector(".abi-rank-close")?.focus();
      });
    }
  }

  function scheduleUpdate() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(updateNavigation);
  }

  window.addEventListener("resize", scheduleUpdate, { passive: true });

  const observerConfig = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: [
      "class",
      "style",
      "data-lang",
      "data-abi-site",
      "data-abi-inspection-notes",
      "data-abi-color-key",
      "data-abi-controls",
      "data-abi-lang",
    ],
    characterData: true,
  };
  const observer = new MutationObserver((records) => {
    const hasExternal = records.some((r) => {
      const el = r.target.nodeType === Node.ELEMENT_NODE ? r.target : r.target.parentElement;
      return !el || !el.closest(".abi-overview, .abi-extension-settings, .abi-settings-modal, .abi-reason-chips");
    });
    if (hasExternal) {
      scheduleUpdate();
    }
  });
  observer.observe(document.documentElement, observerConfig);

  insertWatermark();
  logExtensionBanner();
  removeChineseComments(document);
  updateNavigation();
})();
