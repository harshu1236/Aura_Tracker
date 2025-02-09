package com.harshit.AuraTracker.Controller;

import com.harshit.AuraTracker.Service.ChapterService;
import com.harshit.AuraTracker.modal.Chapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chapters")
public class ChapterController {

    @Autowired
    private ChapterService chapterService;

    @GetMapping("/course/{courseId}")
    public List<Chapter> getChaptersByCourse(@PathVariable Long courseId) {
        return chapterService.getChaptersByCourse(courseId);
    }

    @PostMapping("/add/{courseId}")
    public Chapter addChapter(@PathVariable Long courseId, @RequestBody Chapter chapter) throws Exception {
        return chapterService.addChapter(courseId, chapter);
    }

    @PostMapping("/complete/{chapterId}")
    public Chapter markChapterComplete(@PathVariable Long chapterId) throws Exception {
        return chapterService.markChapterComplete(chapterId);
    }
}
