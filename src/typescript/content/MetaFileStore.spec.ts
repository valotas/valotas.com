import {MetaFileStore} from './MetaFileStore';
import {MetaFile} from './MetaFile';

describe('MetaFileStore', () => {
    let store: MetaFileStore;
    
    beforeEach(() => {
        store = new MetaFileStore({fetch: jasmine.createSpy('fetch')});
    });
    
    it('should have a way to add new listeners', () => {
        store.onChange(function() {});
    });
    
    it('should have provide a way to load new metafiles', () => {
        const meta = new MetaFile();
        spyOn(store, '_loadMetaFile').and.returnValue(Promise.resolve(meta));

        store.load('123');
        
        expect(store._loadMetaFile).toHaveBeenCalledWith('123');
    });
    
    it('should notify the listeners of newly loaded metafiles', (done) => {
        const meta = new MetaFile();
        const listener = jasmine.createSpy('listener');
        spyOn(store, '_loadMetaFile').and.returnValue(Promise.resolve(meta));

        store.onChange(listener);
        store.load('123')
            .then(() => {
                expect(listener).toHaveBeenCalledWith(meta); 
            })
            .then(done);
    });
    
    it('should return a function to deregister listener', (done) => {
        const meta = new MetaFile();
        const listener = jasmine.createSpy('listener');
        spyOn(store, '_loadMetaFile').and.returnValue(Promise.resolve(meta));

        const deregister = store.onChange(listener);
        expect(deregister).toBeTruthy();
        deregister();
        
        store.load('123')
            .then(() => {
                expect(listener).not.toHaveBeenCalledWith(meta); 
            })
            .then(done);
    });
});