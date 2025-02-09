package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.modal.Chapter;

import java.util.List;

public interface ChapterService {
    public List<Chapter> getChaptersByCourse(Long courseId);
    public Chapter addChapter(Long courseId, Chapter chapter) throws Exception;
    public Chapter markChapterComplete(Long chapterId) throws Exception;

}
