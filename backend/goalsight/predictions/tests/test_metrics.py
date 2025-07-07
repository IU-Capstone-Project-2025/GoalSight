import os
import json
import pytest
from django.conf import settings

# thresholds
MIN_CV_ACCURACY = 0.65
MIN_F1_MACRO   = 0.65

@pytest.fixture(scope="module")
def metrics():
    metrics_path = os.path.join(settings.BASE_DIR, 'ml_models', 'metrics.json')
    assert os.path.exists(metrics_path), f"metrics.json not found in {metrics_path}"
    with open(metrics_path, 'r') as f:
        return json.load(f)

def test_cv_accuracy_threshold(metrics):
    cv_acc = metrics.get('cv_accuracy')
    assert isinstance(cv_acc, (float, int)), "Metric 'cv_accuracy' must be a float or int"
    assert cv_acc >= MIN_CV_ACCURACY, (
        f"cv_accuracy too low: {cv_acc:.3f} < {MIN_CV_ACCURACY:.3f}"
    )

def test_f1_macro_threshold(metrics):
    macro = metrics.get('macro avg') or metrics.get('macro_avg')  # в зависимости от формата
    assert isinstance(macro, dict), "key 'macro avg' must be a float or int"
    f1 = macro.get('f1-score') or macro.get('f1_score')
    assert isinstance(f1, (float, int)), "F1-score in 'macro avg' must be a float or int"
    assert f1 >= MIN_F1_MACRO, (
        f"macro avg F1-score too low: {f1:.3f} < {MIN_F1_MACRO:.3f}"
    )