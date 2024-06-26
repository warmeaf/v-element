---
title: Collapse | V-Element
description: Collapse 组件的文档
---

# Collapse 折叠面板

通过折叠面板收纳内容区域

## 基础用法

可同时展开多个面板，面板之间不影响

<preview path="../examples/collapse/Basic.vue" title="基础用法" description="Collapse 组件的基础用法"></preview>

## 手风琴效果

每次只能展开一个面板

通过 `accordion` 属性来设置是否以手风琴模式显示。

<preview path="../examples/collapse/Accordion.vue" title="手风琴效果" description="Collapse 组件的手风琴效果用法"></preview>

## Collapse Attributes

| 属性名                | 详情                               | 类型                                                 | Accepted Values | 默认值 |
| --------------------- | ---------------------------------- | ---------------------------------------------------- | --------------- | ------ |
| model-value / v-model | currently active panel             | string (accordion mode) / array (non-accordion mode) | —               | —      |
| accordion             | whether to activate accordion mode | boolean                                              | —               | false  |

## Collapse Events

| 属性名 | 详情                               | Parameters                                                          |
| ------ | ---------------------------------- | ------------------------------------------------------------------- |
| change | triggers when active panels change | (activeNames: array (non-accordion mode) / string (accordion mode)) |

## Collapse Slots

| Name | Description               | Subtags       |
| ---- | ------------------------- | ------------- |
| -    | customize default content | Collapse Item |

## Collapse Item Attributes

| Name     | Description                        | Type          | Accepted Values | Default |
| -------- | ---------------------------------- | ------------- | --------------- | ------- |
| name     | unique identification of the panel | string/number | —               | —       |
| title    | title of the panel                 | string        | —               | —       |
| disabled | disable the collapse item          | boolean       | —               | —       |

## Collapse Item Slot

| Name  | Description                    |
| ----- | ------------------------------ |
| —     | content of Collapse Item       |
| title | content of Collapse Item title |
