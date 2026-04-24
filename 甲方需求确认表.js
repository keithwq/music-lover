const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
    AlignmentType, WidthType, BorderStyle, ShadingType, HeadingLevel } = require('docx');
const fs = require('fs');

// 定义边框样式
const border = { style: BorderStyle.SINGLE, size: 1, color: "999999" };
const borders = { top: border, bottom: border, left: border, right: border };

// 创建单元格的辅助函数
function createCell(text, width, options = {}) {
    return new TableCell({
        borders,
        width: { size: width, type: WidthType.DXA },
        shading: options.shading ? { fill: options.shading, type: ShadingType.CLEAR } : undefined,
        margins: { top: 60, bottom: 60, left: 100, right: 100 },
        children: [new Paragraph({
            children: [new TextRun({ text, bold: options.bold || false, size: 21 })]
        })]
    });
}

// 创建复选框文本
function checkbox(text) {
    return new Paragraph({
        spacing: { before: 60, after: 60 },
        children: [new TextRun({ text: `□ ${text}`, size: 21 })]
    });
}

const doc = new Document({
    styles: {
        default: {
            document: {
                run: { font: "Microsoft YaHei", size: 21 }
            }
        },
        paragraphStyles: [
            {
                id: "Heading1",
                name: "Heading 1",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: { size: 32, bold: true, font: "Microsoft YaHei" },
                paragraph: { spacing: { before: 240, after: 120 } }
            },
            {
                id: "Heading2",
                name: "Heading 2",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: { size: 26, bold: true, font: "Microsoft YaHei" },
                paragraph: { spacing: { before: 200, after: 100 } }
            }
        ]
    },
    sections: [{
        properties: {
            page: {
                margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
            }
        },
        children: [
            // 标题
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
                children: [new TextRun({ text: "会员管理系统 - 甲方需求确认表", bold: true, size: 36 })]
            }),
            new Paragraph({
                spacing: { after: 300 },
                children: [new TextRun({ text: "请填写以下内容，帮助我们准确理解您的需求", size: 21, italics: true })]
            }),

            // 一、业务模式
            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("一、您的业务模式")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1. 您目前有哪些项目？请列出所有：")] }),

            // 项目表格
            new Table({
                width: { size: 9360, type: WidthType.DXA },
                columnWidths: [800, 2500, 3000, 3060],
                rows: [
                    new TableRow({
                        children: [
                            createCell("序号", 800, { shading: "E8F4F8", bold: true }),
                            createCell("项目名称", 2500, { shading: "E8F4F8", bold: true }),
                            createCell("项目类型", 3000, { shading: "E8F4F8", bold: true }),
                            createCell("单价/价格体系", 3060, { shading: "E8F4F8", bold: true })
                        ]
                    }),
                    new TableRow({ children: [createCell("1", 800), createCell("", 2500), createCell("", 3000), createCell("", 3060)] }),
                    new TableRow({ children: [createCell("2", 800), createCell("", 2500), createCell("", 3000), createCell("", 3060)] }),
                    new TableRow({ children: [createCell("3", 800), createCell("", 2500), createCell("", 3000), createCell("", 3060)] }),
                    new TableRow({ children: [createCell("4", 800), createCell("", 2500), createCell("", 3000), createCell("", 3060)] }),
                    new TableRow({ children: [createCell("5", 800), createCell("", 2500), createCell("", 3000), createCell("", 3060)] })
                ]
            }),

            new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "项目类型说明：", bold: true, size: 21 })] }),
            checkbox("单次服务 - 按次付费，如私教体验课"),
            checkbox("次卡 - 固定次数，用完为止，如瑜伽10次卡"),
            checkbox("储值卡 - 预存金额，消费扣余额，如充值1000送100"),
            checkbox("期限卡 - 有效期内无限次，如读书会年费"),

            new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "填写示例：", bold: true, size: 21 })] }),
            new Paragraph({ children: [new TextRun({ text: "• 读书会年费 / 期限卡 / ¥500/年", size: 21 })] }),
            new Paragraph({ children: [new TextRun({ text: "• 瑜伽10次卡 / 次卡 / ¥800", size: 21 })] }),
            new Paragraph({ children: [new TextRun({ text: "• 私教体验课 / 单次服务 / ¥200", size: 21 })] }),

            // 二、会员信息
            new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 400 }, children: [new TextRun("二、会员信息")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2. 当前会员规模：")] }),
            new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "会员总数约：________________ 人", size: 21 })] }),
            new Paragraph({ children: [new TextRun({ text: "活跃会员（近3个月有消费）约：________________ 人", size: 21 })] }),
            new Paragraph({ children: [new TextRun({ text: "跨多个项目消费的会员约：________________ 人", size: 21 })] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 200 }, children: [new TextRun("3. 会员信息需要记录哪些字段？（请勾选）")] }),
            checkbox("姓名（必填）"),
            checkbox("手机号（必填）"),
            checkbox("性别"),
            checkbox("生日（用于生日提醒/营销）"),
            checkbox("微信号"),
            checkbox("会员来源（朋友介绍/抖音/美团等）"),
            checkbox("会员标签（VIP/普通/潜在等）"),
            checkbox("备注（特殊需求、喜好等）"),
            new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun({ text: "□ 其他：________________________________", size: 21 })] }),

            // 三、核心痛点
            new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 400 }, children: [new TextRun("三、核心痛点（数据导出）")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4. 您现在多久需要导一次数据？")] }),
            checkbox("每天"),
            checkbox("每周"),
            checkbox("每月"),
            checkbox("不定期，有需求时"),

            new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 200 }, children: [new TextRun("5. 导出数据用来做什么？（可多选）")] }),
            checkbox("财务对账"),
            checkbox("经营分析（看哪些项目赚钱）"),
            checkbox("会员营销（找高价值客户）"),
            checkbox("给员工算提成"),
            new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun({ text: "□ 其他：________________________________", size: 21 })] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 200 }, children: [new TextRun("6. Excel报表必须包含哪些内容？（请勾选）")] }),

            new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "会员基本信息：", bold: true, size: 21 })] }),
            checkbox("会员姓名"),
            checkbox("手机号"),
            checkbox("加入日期"),
            checkbox("会员状态"),

            new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "各项目消费金额（按项目分列）：", bold: true, size: 21 })] }),
            new Paragraph({ spacing: { before: 60 }, children: [new TextRun({ text: "□ 项目1：________________ 消费金额", size: 21 })] }),
            new Paragraph({ children: [new TextRun({ text: "□ 项目2：________________ 消费金额", size: 21 })] }),
            new Paragraph({ children: [new TextRun({ text: "□ 项目3：________________ 消费金额", size: 21 })] }),
            new Paragraph({ children: [new TextRun({ text: "□ 项目4：________________ 消费金额", size: 21 })] }),

            new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "汇总数据：", bold: true, size: 21 })] }),
            checkbox("总消费金额"),
            checkbox("总消费次数"),
            checkbox("首次消费日期"),
            checkbox("最近消费日期"),
            checkbox("平均客单价"),
            new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun({ text: "□ 其他：________________________________", size: 21 })] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 200 }, children: [new TextRun("7. 导出时需要哪些筛选条件？")] }),
            checkbox("时间范围（开始日期 - 结束日期）"),
            checkbox("按项目筛选"),
            checkbox("按会员等级筛选"),
            checkbox("按消费金额区间筛选"),
            new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun({ text: "□ 其他：________________________________", size: 21 })] }),

            // 四、预约管理
            new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 400 }, children: [new TextRun("四、预约管理")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("8. 哪些项目需要预约功能？")] }),
            checkbox("全部项目都需要"),
            new Paragraph({ spacing: { before: 60 }, children: [new TextRun({ text: "□ 部分项目需要，请说明：________________________________", size: 21 })] }),
            checkbox("暂时不需要预约功能"),

            new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 200 }, children: [new TextRun("9. 预约方式：")] }),
            checkbox("会员自己在手机上预约"),
            checkbox("前台工作人员代预约"),
            checkbox("两种方式都需要"),

            new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 200 }, children: [new TextRun("10. 预约提醒：")] }),
            checkbox("不需要提醒"),
            new Paragraph({ spacing: { before: 60 }, children: [new TextRun({ text: "□ 需要提醒，提前 ________________ 小时", size: 21 })] }),
            new Paragraph({ spacing: { before: 60 }, children: [new TextRun({ text: "□ 提醒方式：□ 微信  □ 短信  □ 电话", size: 21 })] }),

            // 五、现有数据
            new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 400 }, children: [new TextRun("五、现有数据")] }),
            
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("11. 您现在简艺系统里的数据：")] }),
            checkbox("可以导出Excel"),
            checkbox("可以导出CSV"),
            checkbox("不确定，需要确认"),
            checkbox("无法导出"),

            new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 200 }, children: [new TextRun("12. 历史数据是否需要迁移到新系统？")] }),
            checkbox("需要，全部迁移"),
            checkbox("需要，只迁移最近一年的"),
            checkbox("不需要，从零开始"),
            checkbox("不确定"),

            // 六、其他需求
            new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 400 }, children: [new TextRun("六、其他需求")] }),
            
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("13. 除了数据导出，简艺还有哪些功能不够用？")] }),
            new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "_________________________________________________________________", size: 21 })] }),
            new Paragraph({ children: [new TextRun({ text: "_________________________________________________________________", size: 21 })] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 200 }, children: [new TextRun("14. 您最希望新系统解决的3个问题是什么？")] }),
            new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "1. _________________________________________________________________", size: 21 })] }),
            new Paragraph({ children: [new TextRun({ text: "2. _________________________________________________________________", size: 21 })] }),
            new Paragraph({ children: [new TextRun({ text: "3. _________________________________________________________________", size: 21 })] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 200 }, children: [new TextRun("15. 有没有特别喜欢的参考系统或功能？")] }),
            new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "_________________________________________________________________", size: 21 })] }),

            // 七、联系方式
            new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 400 }, children: [new TextRun("七、联系方式")] }),
            new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "填写人：__________________________", size: 21 })] }),
            new Paragraph({ children: [new TextRun({ text: "联系电话：__________________________", size: 21 })] }),
            new Paragraph({ children: [new TextRun({ text: "填写日期：__________________________", size: 21 })] }),

            // 底部提示
            new Paragraph({ spacing: { before: 400 }, children: [new TextRun("")] }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                shading: { fill: "FFF8E1" },
                spacing: { before: 200, after: 200 },
                children: [new TextRun({ text: "填写完成后请发回，我们将根据您的需求制定开发方案。", bold: true, size: 21 })]
            })
        ]
    }]
});

// 生成文档
Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync("甲方需求确认表.docx", buffer);
    console.log("文档已生成：甲方需求确认表.docx");
});
